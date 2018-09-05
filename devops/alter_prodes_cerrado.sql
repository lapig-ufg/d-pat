ALTER TABLE prodes_cerrado
	ADD COLUMN year smallint,
	ADD COLUMN baseline boolean;

UPDATE prodes_cerrado 
	SET year = CAST (substring(classname from 3) as smallint)
	WHERE classname LIKE 'D_%';

UPDATE prodes_cerrado SET baseline = FALSE;

UPDATE prodes_cerrado 
	SET baseline = TRUE
	WHERE classname = 'D_2008' AND source = 'prodes_amz';

UPDATE prodes_cerrado 
	SET baseline = TRUE
	WHERE classname = 'D_2000' AND source = 'prodes_cerrado';