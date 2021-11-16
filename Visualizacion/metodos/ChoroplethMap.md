# ChoroplethMap

Los mapas coropléticos son una forma sencilla de visualizar cómo varía una medida en un área geográfica o de mostrar el nivel de variabilidad de esa medida dentro de una región.

![ChoroplethMap](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Choropleth_Map.png/450px-Choropleth_Map.png)

## Descripción

Es un mapa temático en el que las áreas se sombrean de distintos colores, frecuentemente de la misma gama cromática, que representan distintos valores de una variable estadística característica de esa región geográfica, como puede ser la densidad de población o la renta per cápita.

## Etimología

El mapa de coropletas más antiguo conocido fue creado en 1826 por el barón Pierre Charles Dupin, que muestra la disponibilidad de educación básica en Francia por departamento.Pronto se produjeron más "cartes teintées" ("mapas tintados") en Francia para visualizar otras "estadísticas morales" sobre educación, enfermedades, delitos y condiciones de vida. 

## Funcionamiento y tipos de datos adecuados
''' 
Datos cuantitativos, cualitativos?
''' 
Los datos deben ser geolocalizados o agrupados por las regiones que se quieren mostrar. La variable puede ser cualitativa (se mostrará una gama de colores) o cuantitativa discreta o continua en caso de ser continua se dividirá en grupos y se adecuarán la gama cromática a representar. Las progresiones de colores pueden ser:

* Progresión secuencial.
    * Escala de grises. ![GrayScale](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Color_progression_examples_value_progression.svg/330px-Color_progression_examples_value_progression.svg.png)
    * Progresión de un solo tono.
    ![SingleHue](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Color_progression_examples_single_hue.svg/330px-Color_progression_examples_single_hue.svg.png)
    * Progresión espectral parcial.
    ![SpectralProgression](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Color_progression_examples_blended_hue.svg/330px-Color_progression_examples_blended_hue.svg.png)
* Progresión divergente o bipolar. ![Bipolar](https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Color_progression_examples_bi-polar.svg/330px-Color_progression_examples_bi-polar.svg.png)
* Progresión espectral. ![Spectral](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Color_progression_examples_full-spectral.svg/330px-Color_progression_examples_full-spectral.svg.png)
* Progresión cualitativa.![Qualitative](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Color_progression_examples_qualitative.svg/330px-Color_progression_examples_qualitative.svg.png)

### Limitaciones

* Se necesitan datos geolocalizados o geográficos.
* Solo una variable a mostrar.

## Aplicaciones 

## Ejemplo con conjunto de datos abiertos

# Referencias

* [wikipedia](https://es.wikipedia.org/wiki/Mapa_coropl%C3%A9tico)