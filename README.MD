# DIFICULTADES

al guardar el valor del nuevo comment en el state de redux la propiedad
date daba error al ser leida por moment.Decia que date no es una funcion.

esto es porque al guardarse los datos en redux no se serialzia.o serializa.no se y hace que pieda la propiedad de funcion, en consecuencia al ser leido
ya no es una funcion.


-------------------------


onSnapshot no funcionaba arrojando `error bc` porque todos los metodos 
de firebase tienen que ser exportados de firebase y no de firebase/lite