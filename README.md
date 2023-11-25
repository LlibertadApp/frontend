![GitHub Repo Size](https://img.shields.io/github/repo-size/Las-Fuerzas-Del-Cielo/Sistema-Anti-Fraude-Electoral)

# LibertApp

Este es un proyecto **Open Source** (código libre) cuyo objetivo es minimizar y detectar la posibilidad de fraude electoral en las proximas elecciones presidenciales de Argentina donde se define finalmente quien sera presidente.

La intencion de crear este sistema es mantener y preservar la democracia y la transparencia al pueblo argentino.

## Indice

- [LibertApp](#libertapp)
  - [Indice](#indice)
  - [Objetivos](#objetivos)
  - [Componentes](#componentes)
  - [Repositorios y organización](#repositorios-y-organización)
  - [Tipos de Fraudes](#tipos-de-fraudes)
    - [Mesas Inexistentes](#mesas-inexistentes)
    - [Datos de Mesa Correctos luego Incorrectos](#datos-de-mesa-correctos-luego-incorrectos)
    - [Fiscales Falsos](#fiscales-falsos)
    - [Fiscales Judas](#fiscales-judas)
    - [Conteo de Voto Corrupto por falta del Fiscal de Mesa](#conteo-de-voto-corrupto-por-falta-del-fiscal-de-mesa)
  - [Usuarios](#usuarios)
  - [Funcionalidad](#funcionalidad)
  - [Arquitectura del Sistema](#arquitectura-del-sistema)
    - [Componentes Principales](#componentes-principales)
      - [Base de Datos](#base-de-datos)
      - [Servicios de Backend](#servicios-de-backend)
      - [Frontend](#frontend)
      - [Procesos Batch](#procesos-batch)
  - [Discord para Desarrolladores](#discord-para-desarrolladores)
  - [Redes Sociales](#redes-sociales)


## Objetivos

Los objetivos de este sistema son:

1. Llevar un control de las actas de escrutinio de cada mesa de votación del país, y compararlas contra los mismos datos provistos por la CNE (Cámara Nacional Electoral)
2. Identificar potenciales fraudes electorales.
3. Minimizar su ocurrencia e impacto.
4. Acelerar su detección para evitar la falsa declaración de un ganador con altos niveles de fraude/casos sospechosos.

## Componentes

- Landing page institucional de LibertApp
- Frontend LibertApp para Fiscales (carga de datos)
- Frontend Para la visualización de datos, público desde las 21:00 del domingo 21/11
- Backend para gestionar fiscales y datos cargados (API)
- OCR para comparar los datos cargados (IA)

## Repositorios y organización

Este readme tiene la finalidad de:

- Explicar el proyecto en general
- Servir de sistema de documentacion general.
- Explicar el proceso de colaboración con el proyecto.

Estos repositorios son las partes complementarias del proyecto:

- [Landing Page](https://github.com/LlibertadApp/landing)
- [Frontend LibertApp](https://github.com/LlibertadApp/frontend)
- [Frontend Dashboard](https://github.com/LlibertadApp/frontend-dashboard)
- [Frontend Backoffice](https://github.com/LlibertadApp/backoffice-frontend)
- [Backend API](https://notengolink.com)
__Faltan varios más__

## Tipos de Fraudes

¿Qué tipos de fraude se esperan detectar? En una elección como esta, hay muchas formas de hacer fraude si uno posee control sobre el sistema de cómputos oficial.

Esta es la columna vertebral de este proyecto, de allí deriva toda la funcionalidad que se va a construir. Si tu intención es aportar tus soluciones al proyecto, se te ocurre algún otro tipo de fraude y cómo minimizarlo, podes contactarte con algún colaborador actual del proyecto para agregarlo a la lista y poder aplicar la mejora en conjunto. Esta es la lista de tipos de fraudes que se buscan mitigar.

### Sumarización Fraudulenta

El centro de cómputos tiene cargados correctamente todos los datos, pero aún así, el agrupamiento por Provincia / Nación es incorrecto.

### Mesas Inexistentes

El centro de cómputos tiene cargados correctamente todos los datos, pero además de las mesas reales, hay mesas que solo existen en el sistema y que se usan para alterar los resultados globales.

### Datos de Mesa Correctos, luego Incorrectos

El centro de cómputos tiene datos cargados que difieren con las actas de los fiscales de las mesas. Si bien esto es comprobable a mano, la masividad de los datos es tanta que hasta revisarlo completamente se tardaría mucho más tiempo del permitido para realizar los reclamos correspondientes.

### Fiscales Falsos

Son fiscales de partidos opuestos que se anotan para ocupar un espacio y luego ausentarse cuando es dificil conseguir reemplazo.

El sistema busca facilitar la gestión de fiscales, centralizandolos en un panel donde cada coordinador dispondrá de los datos completos de los fiscales a su cargo y podrá mantener su lista actualizada.

Además permitirá tener cargados datos previos de su trabajo, para que si en instancias previas de procesos electorales se ausentaron sin causa o de manera sospechosa, no se los vuelva a convocar.

### Fiscales Judas

Son fiscales de partidos opuestos que fiscalizan para un partido, pero defendiendo en secreto los votos de otro. En estas mesas será posible realizar una carga de datos corrupta al Sistema Oficial.

<!-- ¿Acá podríamos mencionar algo del chatbot para detectar a este tipo de fiscales antes de anotarlos? -->

### Fiscales Incompetentes

<!-- Esto no es precisamente un fraude, pero tipeo abajo a lo que apuntamos -->

Para evitar fiscales incompetentes, el sistema apunta a desarrollar una plataforma paralela que permita que cada fiscal nuevo requiera de completar una serie de cursos cortos sobre fiscalización, lo que permitiría llevar un registro del estado de capacitación de cada fiscal, permitiendo elegir primero los fiscales que más hayan dedicado tiempo a instruirse en el proceso electoral.

### Conteo de Voto Corrupto por falta del Fiscal de Mesa

El sistema busca evitar que hayan escuelas sin fiscales, ya que, de ser este el caso, el riesgo de manipulación del conteo es mucho mayor. Esto se puede lograr a través de un mapa que identifique los establecimientos y el número de fiscales asignados actualmente a cada uno de ellos. Lo que permite controlar en directo los puntos donde más falten fiscales, y solicitar traspasos hacia dichos establecimientos.

## Usuarios

Esta APP tendría estos tipos de usuarios:

1. **Fiscal de Mesa:** El principal usuario de esta APP serían los Fiscales de Mesa del partido, quienes cargarán los datos.

2. **Fiscal General:** Supervisa a los Fiscales de Mesa en un determinado establecimiento. El fiscal general también debe tomar fotos de todas las actas de todas las mesas de la escuela a la cual fue asignado para un doble control, que luego será procesado por la Inteligencia Artificial para realizar la comparación.

3. **Delegado del Partido:** Son personas de confianza del partido, que durante la votación pueden ir de una escuela a otra para apoyar y auditar a los Fiscales Generales y a los Fiscales de Mesa.

4. **Auditor Interno:** Son personas de confianza del partido que se encargan de analizar los datos cargados por los fiscales donde a causa de un conflicto no hayan podido ser procesados por la Inteligencia Artificial, para que manualmente resuelvan la incidencia y carguen los datos correctos.

5. **Público:** Cualquier persona que quiera ver los resultados en línea, de acuerdo a los datos cargados por los Fiscales de Mesa del partido. También podrán navegar por toda la información disponible en el sistema.

Es importante mencionar que las irregularidades se deben detectar y denunciar lo antes posible, para que antes de que se nombre un ganador, haya una reacción del público general ante un potencial fraude de gran escala, ya que una vez se declara un ganador es casi imposible de revertir, sin importar la cantidad de denuncias de fraude que se hayan presentado.

## Funcionalidad

1. **Carga de Datos**: La APP permitiría a los Fiscales de Mesa cargar los datos de las mesas que supervisan. El sistema acumularía todos los datos en una base de datos.

2. **Reportes para Auditores**: El sistema generaría diferentes tipos de reportes orientados a detectar fraude, basándose en los datos cargados por los Fiscales de Mesa y los datos Oficiales.

3. **Consultas para el Público**: El sistema permitiría ejecutar diferentes tipos de consultas para el público en general.

4. **Mapa / Reporte de Fiscales Trabajando**: El sistema debería permitir saber en línea dónde hay y dónde no hay fiscales, así a través de las redes se puede movilizar a la gente para que vaya a fiscalizar, donde más haga falta. De ahí podrían tomar los datos que estarían actualizados a toda hora durante la votación de dónde es más crítico llamar por las redes para que se refuercen esas escuelas.

5. **Mapa / Información de Bunkers-Sucursales**: El sistema debe permitir visualizar un mapa que informe sobre los puntos para retirar boletas y las sucursales del partido.

## Arquitectura del Sistema
<!-- Actualizar esto ya -->
<!-- ESTO LO TIENE QUE HACER ALE -->

- **Cloudflare:** Se utiliza para la gestión de DNS, CDN y seguridad en la capa 7.

- **React SPA:** Alojada en S3.

- **API Express:** Hospedada como un monolito en una función Lambda. Esto permite flexibilidad para los desarrolladores y evita la complejidad de tener que adaptarse al desarrollo de microservicios.

- **API Gateway:** Aquí ocurre la magia de hacer un monolito serverless, ya que todos los endpoints se proxean a la Lambda que ejecuta el servidor Express.

- **DynamoDB:** Otro servicio serverless que nos evita tener que lidiar con configuraciones de escalado y posibles picos inesperados de tráfico. Esto asegura que la aplicación pueda soportar altos niveles de carga sin fallar.

- **S3 Bucket:** Aquí se subirán assets en forma de videos o imágenes como pruebas de fraudes.

Hay muchas formas de abordar la arquitectura de un sistema como este. Enumeremos primero los criterios más importantes que queremos seguir y, a partir de ellos, derivaremos la arquitectura que emerja.

1. El sistema completo debe desarrollarse y probarse en tiempo récord. Ese es el principal contraint.

2. Necesitamos poner a trabajar a muchas personas en paralelo, con la mínima fricción entre ellos. Para lograrlo, debemos dividir el sistema en bloques de casos de uso que interactúen entre sí a través de interfaces bien definidas.

3. Debemos minimizar la confianza en cada individuo que participe, ya que nadie se conoce y nadie sabe quién es quién, y algunos podrían asumir responsabilidades con la intención explícita de no cumplirlas, entre otras cosas.

4. Debemos minimizar el riesgo de fallos el día de las elecciones, por lo que debemos tener redundancia no solo a nivel de hardware, sino también de software.

5. Creemos en el OPEN SOURCE, en sistemas PERMISSIONLESS y DECENTRALIZADOS (hasta donde sea posible y razonable para este caso). Queremos desarrollar un sistema que no solo permita que cualquiera pueda auditar su código por ser de código abierto, sino que también permita que cualquier persona del mundo se registre con cualquiera de sus roles/tipos de usuarios. De esta manera, por primera vez en la historia, cualquier persona, esté donde esté a través de Internet, puede ayudar a auditar la elección y prevenir fraudes.

### Componentes Principales

#### Base de Datos
<!-- ACA TIENE QUE TOCAR LUCIANO -->

**Base de Datos Principal**

La base de datos del sistema es, en nuestro caso, el SINGLE POINT OF FAILURE (salvo que esté replicada). Visualizamos tener al menos una base de datos para la información recogida por los Fiscales de Mesa y los Fiscales Generales, que será de lectura / escritura y desde ella se servirá la información para las funcionalidades de esos roles (Fiscales de Mesa, Fiscales Generales).

**Base de Datos Read-Only**

Para consultas del Público en General o del ejército online de auditores, debido a que es difícil estimar la cantidad de usuarios en esos roles en un sistema abierto y permissionless, es posible que tengamos una réplica de la base de datos anterior pero de solo lectura, o una versión in-memory o cache para servir todo tipo de requerimientos de consultas por parte de estos tipos de usuarios.

**Base de Datos de Usuarios**

Estaría separada del resto para que sea construida, mantenida y operada por gente especializada en Seguridad de Sistemas y que nadie ajeno a ese equipo pueda romper nada aquí.

#### Servicios de Backend
<!-- ACA TIENE QUE TOCAR EL R4ST4M44444nnn -->

**Backend Principal**

El backend principal será el que tenga la business logic de los casos de uso principales, que son los que corresponden a los Fiscales de Mesa, Fiscales Generales, Delegados del Partido.

**Backend Read Only**

Es posible que tengamos un backend para las operaciones read-only del público en general / auditores externos al partido. Es posible que este backend trabaje con una réplica offline de la Base de Datos Principal, actualizada cada tanto.

**Backend para Logins / Signups / Mantenimiento de Usuarios**

Normalmente esto sería parte del Backend Principal, pero como tenemos tan poco tiempo, podríamos separar este grupo de funcionalidades para que un equipo especializado desarrolle esto sin tocar nada en el resto del sistema.

#### Frontend

**UI Web / Mobile para Fiscales**

La UI para los Fiscales debe considerarse de misión crítica. Si ella no funcionara, no tendríamos nada, ya que los fiscales son los que cargan los datos, que son la base de todas las auditorías que el sistema va a permitir realizar.

Si todas las mesas tuvieran fiscales, se prevé entre 100.000 y 150.00 potenciales usuarios, que corresponde con la cantidad de mesas de votación a nivel nacional.

**UI Web para el público en general / auditores externos**

La UI para el público en general / auditores externos y las ideas de funcionalidades misión no crítica serán una web app aparte. En este caso, la masa potencial de usuarios es tremendamente mayor que la anterior, en el orden de los 30 o 40 millones de personas potencialmente que pudieran querer consultar los resultados como los ve el partido. Permitir que cualquier número de personas entre al sistema a auditar puede ser la clave para que, combinado con el uso / denuncias a través de redes sociales de un gran número de personas, se puedan desaconsejar las posibles prácticas fraudulentas que la gente que controla el sistema oficial (que es un sistema cerrado y opaco) pudiera querer efectuar.

**UI Backoffice / Mantenimiento de Usuarios**

Esta sería la UI específica para la gestión de los fiscales del partido, a la que sólo tendrán acceso personas de pura confianza para administrar la creación de los usuarios. Los coordinadores sólo podrán ver y gestionar los usuarios que ellos mismos hayan creado, mientras que un usuario con mayor nivel de permisos podrá realizar acciones sobre la totalidad de los fiscales del partido.

#### Procesos Automatizados

**Extracción de Datos del Sistema Oficial**

El sistema oficial provee aquí (https://resultados.mininterior.gob.ar/desarrollo) instrucciones de cómo acceder a ciertos datos del mismo a través de una API. Contaremos con un proceso que lea dichos datos cada cierto tiempo y actualice nuestra base de datos. Una vez se hayan recopilado una cantidad considerable de datos, se ejecutará una comparación de ambas bases de datos y una corroboración de las actas usando la Inteligencia Artificial para obtener un listado con todas las irregularidades de manera instantánea.

**Procesos de Detección de Irregularidades**

Con los datos cargados por los Fiscales a través de la app más los datos extraidos del sistema oficial, el sistema tiene la capacidad de correr multiples procesos cada uno especializado en detectar algun tipo de irregularidad.

## Cómo contribuir
<!-- VER LO QUE HABÍAMOS ESCRITO CON CRYS -->

Para aportar tu contribución, tenés que crear un fork que incluya la rama dev y trabajar en ella. Cuando hayas terminado con tus cambios, crea un PR desde tu fork apuntando a la rama dev de este repositorio. Si es posible, agrega una descripción detallada al PR para que los revisores puedan orientarse rápidamente y agrega las etiquetas correspondientes a los cambios realizados.

En resumen:

- Crear un fork de este repositorio que incluya la rama **dev**.
- Realizar los cambios en el clon local del fork en la rama **dev**.
- Subir los cambios a tu fork.
- Crear un PR hacia la rama **dev** de este repositorio.
- Agrega una descripción clara de los cambios en el PR.
- Agrega etiquetas correspondientes a los cambios en el PR.

# Discord para Desarrolladores

Para ingresar al discord de desarrolladores, deberás obtener una invitación que te será otorgada a través de nuestras redes sociales. Contactate con nosotros a través de cualquiera de ellas.

# Redes Sociales

Podes encontrarnos en:

[Twitter](https://x.com/libertapp)
[Instagram](https://www.instagram.com/libertadapp/)
[TikTok](https://www.tiktok.com/@libertadapp)


<!-- TODO -->
<!-- Actualizar Index -->
<!-- Actualizar parte DB, Infra y Backend -->
<!--  Actualizar parte de contribuciones en función de lo que habíamos escrito con Crys -->