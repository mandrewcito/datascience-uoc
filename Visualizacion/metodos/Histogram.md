# Histograma

## Descripción

Un histograma es una representación gráfica de una variable en forma de barras. El tamaño de estas barras es proporcional a la frecuencia de los valores representados.

![Histogram](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Histogram_of_arrivals_per_minute.svg/330px-Histogram_of_arrivals_per_minute.svg.png)

### Etimología

El término "histograma" fue acuñado en 1891 por el matemático estadístico inglés Karl Pearson y es un compuesto de los términos griegos "histós" (mástil) y "gramma" (figura).

## Funcionamiento y tipos de datos adecuados

Se utilizan para relacionar variables cuantitativas continuas. Para variables cuantitativas discretas las barras se dibujan separadas y el gráfico se llama diagrama de frecuencias, porque la variable representada en el eje horizontal ya no representa un espectro continuo de valores, sino valores cuantitativos específicos, igual que ocurre en un diagrama de barras, usado para representar una característica cualitativa o categórica.

Otros gráficos similares al histograma son los diagramas de barras, que se suelen aplicar a variables discretas y a las cualitativas.

``` 
En todos estos diagramas la muestra o la población se divide en intervalos (del parámetro a estudiar, por ejemplo estatura) y aparece el dilema de si incluir el extremo del intervalo (por ejemplo 180 cm) en el primer o en el segundo intervalo en los que aparece. Tradicionalmente se incluye en el segundo y los intervalos quedan abiertos por la derecha: [170, 180) y [180,190)
```

### Tipos de gráficos relacionados

* Histograma de frecuencias absolutas
* Histograma de frecuencias relativas
* Histograma 
* Función densidad
* Curva acumulativa u ojiva
* Curva acumulativa de frecuencias absolutas

### Limitaciones

Sólo se puede aplicar a variables discretas, en variables continuas no tiene sentido. Aunque la distinción de discreta/continua muchas veces no sea clara.

## Aplicaciones 

Los histogramas se aplican a variables continuas, aquellas en las que la variable observada (estatura, peso, edad…) pueden tomar cualquier valor real, a veces entre dos valores fijos que determinan su rango

## Construcción de un histograma

1. Determinar el rango de los datos. Rango es igual al mayor valor menos el menor valor.

2. Obtener todos los números de grupos, existen 4 criterios para determinar el número de clases (o barras) –por ejemplo, la [regla de Sturges](https://es.wikipedia.org/wiki/Regla_de_Sturges).

3. Establecer la anchura de clase. Si queremos intervalos iguales tomaremos el rango dividido por el número de clases y comparar con los resultados obtenidos de la dispersión.

4. Construir los intervalos de clases: Los intervalos resultan de dividir el rango de los datos en segmentos iguales usando la anchura de clase obtenida en el paso 3.

5. Graficar el histograma: Como todas las clases tienen la misma amplitud las bases de las barras son los intervalos de clases y la altura es la frecuencia de las clases. 

## Ejemplo con conjunto de datos abiertos

* [Ejemplo histograma](./HistogramChart.html)

# Referencias

* [Wikipedia](https://es.wikipedia.org/wiki/Histograma)


