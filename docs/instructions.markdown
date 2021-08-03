---
layout: page
title: Instrucciones de uso
permalink: /instructions/
---

Para poder utilizar la presente extensión primero es necesario instalarla desde
el conjunto de complementos de Google WorkSpace.

## Preparación del documento
Una vez instalado, se debe tener en el documento de Google SpreadSheets un
conjunto de hojas, cada uno con el nombre del aula y en cada una la lista de
actividades tal como se muestra a continuación:

![Actividades-hoja](/images/captures/captura_0.png "Tabla con lista de actividades")

Se puede identificar que los tres campos a considerar en este caso son Fecha,
Nombre y Tipo.

Luego, se debe crear una hoja que contenga la lista de aulas y la edad
correspondiente (se ha indicado como edad, puesto que está pensado para una
institución educativa inicial, no obstante, puede reemplazarse por el grado).

## Creación de hoja de resumen
La tabla con la información de las aulas tiene la estructura mostrada a continuación:
![Aulas-lista](/images/captures/instruccion_1.png "Tabla con lista de aulas")

En la extensión, se debe seleccionar lo siguiente:
- **Aulas**: La hoja con la información de la lista de aulas y sus edades. Por
		defecto toma la primera hoja en el documento.
- **Columna Edad**: La columna con la información de la edad en la hoja
		seleccionada. Por defecto, toma la segunda columna.
- **Columna Aula**: La columna con la información del nombre del aula en la
		hoja seleccionada. Por defecto, toma la primera columna.

La lista de nombres que aparece en las columnas, corresponde a los valores de
la primera fila de la hoja seleccionada.

Finalmente, se hace clic en **Generar Hoja Resumen**, para generar una hoja
después de la hoja de actividades donde se consolide la información procedente
de las otras hojas, tomando en consideración la información de la edad de cada
aula.

## Creación de documento de Google Docs
Se puede notar que una vez generada la hoja de Resumen, se habilitan los campos
para generación del documento de Google Docs y el botón **Generar**.

La hoja resumen tiene la estructura mostrada a continuación:
![Generacion-docs](/images/captures/instruccion_2.png "Tabla resumen")

Luego, en la extensión es posible seleccionar lo siguiente:

- **Edad**: La columna de la edad, que es el primer criterio de agrupamiento
		para la generación del documento.

- **Fecha**: La columna de la fecha, que es el segundo criterio de agrupamiento.

- **Nombre**: La columna con el nombre que constituye cada ítem en la lista
		generada en el documento de Google Docs.

- **Tipo**: La columna del tipo de actividad. En este caso, se consideran todos
		los tipos para la generación del documento (En una próxima versión, se
		considera incorporar este campo en la lista de ítems generados).

Finalmente, se puede hacer clic en el botón **Generar** con lo que se genera el
documento de Google Docs en la misma ubicación donde se encuentra el documento
de Google SpreadSheets y con el mismo nombre.

En la siguiente figura se aprecia una muestra del documento generado:
![Doc-generado](/images/captures/instruccion_3.png "Documento generado")

## Consideraciones importantes

La extensión se encuentra en fase de pruebas y está diseñada para un caso
específico de uso tal como se comenta en la [motivación](/#motivación).

Siéntese libre de adaptarlo a su necesidad tomando como referencia el [Código
fuente](/source-code) publicado en GitHub.

Si tiene alguna recomendación, sugerencia o cualquier consulta acerca del uso
de la extensión, así como si le aparece un error al momento de utilizarla, no dude
en reportarlo al siguiente correo: <lv@luighiviton.com>.
