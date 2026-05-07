
# notas-service
Examen 02: App de Notas - Notas Service

# Segundo Examen Parcial (Práctica)

08/05/2026

#### **Instrucciones**
Lee bien el ejercicio detallado a continuación y realiza la implementación dentro de AWS. El ejercicio debe poder desarrollarse dentro del laboratorio. Utiliza el lenguaje de programación que más te resulte cómodo de entender, así como las tecnologías que mejor hayas entendido a lo largo del curso, recuerda que no hay soluciones mágicas, sino cánones y deberá de inferir la razón por la cual eligió tal cuestión y cuáles son los pros y contras de tal vertiente contra otra manera de realizarla. 

Este ejercicio está contemplado para entregarse el mismo día de la presentación del segundo examen parcial a final del día. Una vez finalizado el ejercicio, deberá subirlo por Canvas en el enlace predestinado para el mismo, teniendo como fecha límite de subida el viernes 8 de mayo a las 16:00 horas SIN PRÓRROGAS DE NINGÚN TIPO. 

El entregable será un archivo zip que contiene el código empleado y un PDF en donde se detalle el desarrollo conciso y completo de la solución, los racionales por los que se eligió tal desarrollo y se responda forzosamente a las preguntas del final.

Contrario a otros ejercicios, aquí no existirá una rúbrica, sino que todo será evaluado a conciencia y en función de lo reportado por el alumno, por lo que se recomienda argumentar bien el reporte.

Se permite la discusión abierta entre compañeros para desarrollar este ejercicio, consulta en internet, materiales del curso o apoyo a través de motores de IA y librerías que se consideren necesarias, pero la entrega será completamente individual por lo que todo plagio tanto a compañeros, profesor o referencias no citadas a internet causará un 0 inmediato e inapelable en TODO EL EXAMEN.

#### **Planteamiento:** 

Partiendo del examen anterior:

La aplicación tendrá que dividirse en 3 módulos o funciones completamente independientes:

1. Un código para el manejo de los catálogos (Clientes, Domicilios de Cliente y Productos)
2. Otro para el manejo de las notas de venta
3. Uno más para el envío de las notificaciones por correo electrónico

Partiendo de este supuesto y apegándose a la ideología de las aplicaciones de 12 factores, debemos de realizar lo siguiente:

1. Que cada una de las aplicaciones se pueda ejecutar en un contenedor.
2. Que cada una de las aplicaciones tenga un código base en un repositorio de Git.
3. Que cada aplicación pueda generar una imagen de Docker de forma automatizada mediante la ejecución de pipelines.
4. Que puedan estarse publicando de manera constante a un lugar donde se pueda implementar la aplicación (Github Actions)
5. Que se pueda ejecutar en algún lugar dentro de la nube
6. Que todas las variables de entorno, utilización de secretos y demás estén configuradas debidamente en alguna variable de ambiente y configuraciones
7. Asimismo, tendremos que implementar por lo menos 2 métricas en por lo menos uno de los módulos:
   1. Uno para contabilizar comportamiento ya sea bueno o malo dentro de alguna de las funcionalidades (en caso de que elijas endpoints, te sugiero HTTP por rangos; es decir, uno para 2xx, otro para 4xx y otro para 5xx)
   2. Uno para medir el tiempo de ejecución de un endpoint o funcionalidad.
   3. Las alertas deben discernir, al menos, el ambiente. Si lo ejecutas de manera local, debe de marcar un ambiente local; si lo ejecutas en la nube, supondremos que es producción. 
8. Tendremos que crear una alerta para alguna métrica previamente definida. El umbral a definir es libre, aunque te preguntaré el por qué lo elegiste.
9. Tendrás que crear un dashboard para monitorear tu aplicación. Puedes crear tantos widgets requieras, pero por lo menos te pediré 2:
   1.  Uno para percentiles p50, p90 y p99 en función del tiempo de ejecución donde hayas elegido
   2.  Uno para visualizar el comportamiento de tu métrica de funcionalidad.

ENTREGABLES:

Me tendrás que entregar un archivo zip que contenga tus tres módulos, así como un reporte en el que redactes, al menos, las preguntas a continuación y tus conclusiones.

PREGUNTAS A CONTESTAR:

1. ¿Cuáles son los factores que se han cubierto durante el desarrollo de la aplicación?
2. ¿Cuáles han sido los retos al separar las aplicaciones? ¿Cuál ha sido la parte más complicada de esto? 
3. ¿Qué tipo de tarea administrativa implementarías para ejecutar dicha aplicación? ¿Por qué la implementarías?

NOTA IMPORTANTE:

También puedes realizarlo en lambda, siempre y cuando mantengas tu código en 3 funciones o salidas. Normalmente, para subir lambdas se necesita enviar un archivo ZIP, por lo que sería necesario contar con 3 archivos zip como salida.

