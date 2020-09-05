maxminFilter <- function(SERIE, nn = 3, grau = 2, desvio = 1) {
  ###   
  if (all(is.na(SERIE)) == TRUE) {
    rep(NA, length(SERIE))
  ###  
  } else if(sum(is.na(SERIE)) > 8 ){
    rep(NA, length(SERIE))
  ###  
  } else {
    ######
    polyFilter <- function(ts, nn, grau, desvio = 0) {
      ##
      ns = length(ts)
      new_ts = ts
      idx = -nn:nn
      ##
      X = matrix(rep(0, length(idx) * (grau + 1)), ncol = grau + 1, byrow = FALSE)
      X[, 1] = 1
      for (k in 2:(grau + 1)) {
        X[, k] = (idx) ^ k
      }
      ###
      for (i in 1:ns) {
        idx_ts = (abs(idx + i - 1) %% ns + 1)
        y = ts[idx_ts]
        LM = lm.fit(x = X, y = y)
        ###
        if (desvio == 0) {
          new_ts[i] = LM$coefficients[1]
        ###  
        } else {
          sdv = sd(LM$residuals)
          ###
          if (abs(ts[i] - LM$coefficients[1]) > desvio * sdv) {
            new_ts[i] = LM$coefficients[1]
          }
        }
      }
      ##
      return(new_ts) 
    }
    ######
    maxminOutliers <- function(ts, nn) {
      ns = length(ts)
      lmax = c()
      lmin = c()
      ###
      for (i in 1:ns) {
        to = max(1, (i - nn))
        tf = min(ns, (i + nn))
        M = max(ts[to:tf])
        ###
        if (ts[i] == M) {
          lmax = c(lmax, i)
        ###  
        } else {
          m = min(ts[to:tf])
          ###
          if (ts[i] == m) {
            lmin = c(lmin, i)
          }
        }
      }
      ###
      return(list(
        max = lmax,
        min = unlist(lmin),
        ID = c(lmax, lmin)
      ))
    }
    ######
    interpNaTS <- forecast::na.interp(SERIE)
    #
    OUTLIERS <- maxminOutliers(ts = interpNaTS, nn)$ID
    #
    ADJUSTED <-polyFilter(ts = interpNaTS, nn = nn, grau = grau, desvio = desvio)
    #
    FILTER <- interpNaTS
    FILTER[OUTLIERS] <- ADJUSTED[OUTLIERS]
    ###
    return(as.numeric(FILTER))
  }
}