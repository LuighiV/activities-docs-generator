---
layout: page
title: Instructions of use
lang: en
lang-ref: instructions
---

In order to use this extension, it is necessary to install it from
the suite of add-ons for Google WorkSpace.

## Document preparation
Once installed, you must have a set of sheets in the Google document
SpreadSheets, each one with the name of the classroom and, containing the list
of activities as shown below:

![Activities-sheet](/images/captures/captura_0.png "Table with list of activities")

It can be identified that the three fields to consider in this case are Date,
Name and Type.

Then, a sheet should be created containing the list of classrooms and the age
corresponding (it has been indicated as age, since it is intended for an
elementary educative center, it can be replaced by degree).

## Summary sheet creation
The table with the information about the classrooms has the structure shown below:
![Classrooms-list](/images/captures/instruccion_1.png "Table with list of classrooms")

In the extension, the following must be selected:

- **Aulas**: The sheet with the information on the list of classrooms and
  their ages. By default, takes the first sheet in the document.

- **Columna Edad**: The column with the age information on the sheet
selected. By default, it takes the second column.

- **Columns Aula**: The column with the information of the classroom name
 in the selected sheet. By default, it takes the first column.

The list of names that appears in the columns corresponds to the values of
the first row of the selected sheet.

Finally, click on **Generar Hoja Resumen**, to generate a new sheet
next to the activity sheet where the information is consolidated
from the other sheets, taking into account the information of the age of each
classroom.

## Google Docs Document Creation
It can be noticed that once the Summary sheet is generated, the fields are enabled
to generate the Google Docs document and the button **Generar**.

The summary sheet has the structure shown below:
![Generation-docs](/images/captures/instruccion_2.png "Summary table")

Then, in the extension it is possible to select the following:

- **Edad**: The age column, which is the first grouping criterion
for the generation of the document.

- **Fecha**: The date column, which is the second grouping criterion.

- **Nombre**: The column with the name that constitutes each item in the list
generated in the Google Docs document.

- **Tipo**: The column of the type of activity. In this case, all
the types for the generation of the document (In a future version,
consider incorporating this field in the list of generated items).

Finally, you can click on the button **Generar** with which the
Google Docs document in the same location where the spreadsheet is located
 and with the same name.

The following figure shows a sample of the generated document:
![Doc-generated](/images/captures/instruccion_3.png "Document generated")

## Important considerations

The extension is in the testing phase and is designed for a case
specific to use as discussed in [motivation](/#motivation).

The permissions required for the application are strictly necessary for their
operation, and only affect the files in which they are you are applying the
plugin.  The personal information of users is not collected, in any setting, as
indicated on the page of [privacy](/privacy).

Feel free to adapt it to your needs by referring to the [Source
code](/source-code) published on GitHub.

If you have any recommendations, suggestions or any query about the use of this
extension, as well as if you get an error when using it, do not hesitate
to report it to the following email: <lv@luighiviton.com>.
