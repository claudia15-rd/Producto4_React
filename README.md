Partimos desde un proyecto que ya existe. El producto 3.
Linea de comando y accedes en la carpeta EquipoBasket.

cd EquipoBasket

Empezar a instalar.
Instalamos las librerias de reacct para firebase y messaging

npm install --save @react-native-firebase/app
npm install --save @react-native-firebase/messaging

Para todo el tema de los mensajes hemos utilizado Expo. Para eso habrá que darse de alta. Me imagino que en cada ordenador será diferente.

npx i eas-cli
npx i eas (creo que no es necesario)
npx install expo-dev-client. 
npx eas build --profile development --platform android. E

Este puede tardar bastante ya que como en todo hay Expo de pago que se tarda menos. 

https://docs.expo.dev/develop/development-builds/create-a-build/

Después de esto en el archivo app.json en el apartado Android package habrá creado el identificativo de la aplicación.
A continuación tendremos que ir a Firebase. En este caso hemos elegido el de Claudia irnos al proyecto correspondiente. Como hemos aprobechado los recursos del Producto3 hay que ir a proyecto Producto3-InterfazMovil.
En la rueda dentada de configuración que hay arriba a la izquierda tenemos que ir a la configuración del proyecto, Cuentas de Servicio y Generar nueva clave primaria. Se bajará un fichero json y se arrastra a la carpeta del proyecto. 
En este caso el fichero se llama producto3-interfazmovil-firebase-adminsdk-a0wx0-2dc88fd08f.json

Ahora vamos a generar las credenciales desde expo. 

https://docs.expo.dev/push-notifications/fcm-credentials/

En la misma linea de comando npx eas credentials y seguiremos unos pasos.
Android. Production. Google Service Account. Manage your Google Service Account key for Push Notifications (FCM V1). Set up Google Service Account keyt for Push Notifications (FCM V1). Upload a new service account key. No.
Saldrá como para poner el archivo, te vas a tu carpeta de la aplicación y pegas el nombre del fichero que te has bajado anteriormente.
A continuacilon podemos comprobar que en Expo están las credenciales. Si te vas a la web de Expo verás el proyecto nuevo y podrás picar en él. Te vas en la la columna izquierda y buscas Credentials y verás el identificativo que te ha creado en el package app.json.

Cogemos en la parte inferior FCM1 V1 service acount key una clave que ha generado.

Ahora nos iremos al Firebase y creamos un proyecto de android y el nombre hay que poner el packge que hemos comentado antes, pero como certificado Sha-1 hay que generalo.
Volvemos a la liena de comando y metemos npx eas credentials

Android, development (ojo que este ha cambiado de la vez anterior). Key Store Manage everthing need to build your project. Set up new Keystore. Y. Y . Ahora saldran dos Configuration. Tendremos que coger los SHA1 fingerprint.
Ahora cogemos el  de arriba y lo ponemos abajo donde nos pide la clave para crear el proyecto en android. Le pegas esa clave. Haces next next. No haces caso de momento de lo que te dice.
Vuelves a tu proyecto en Firebase , a la rueda dentada, a General y en la parte de abajo hay una opción que dice agregar huella digital. Aquí le pegas el SHA1 de la parte de abajo que has generado antes.
En la misma pestaña que te has puesto la clave nueva en firebase hay una opción que es bajarte un fichero que se llama google-services.json. Esto lo pones en la carpeta principal de la aplicación.
Ahora le tienes que decir a la aplicación que tiene que cargar esa configuracion. Tienes que volver abrir el app.json y ponerlo ahí. Os pego la parte de android. 

https://docs.expo.dev/push-notifications/fcm-credentials/

 "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.xxxx.EquipoBasket"
    },

Da un error que como si el firebase uno estuviera inicializado.
Primero compilaremos localmente desde expo la apliación de android. Hasta ahora no aparece nada en nuestra aplicación referente a android.

npx expo run:android 

Aquí se estará un buen rato y en nuestro proyecto aparecerá la carpeta de android.
 
Modificaremos el fichero que está dentro de android llamado build.gradle y pondremos :

dependencies {
     classpath('com.android.tools.build:gradle:7.4.2')
     classpath('com.facebook.react:react-native-gradle-plugin')
     classpath("com.google.gms:google-services:4.4.1"). Este es el que no está y hay que poner.
 }

Y luego ver en repositorios que esté google.
Y por último dentro de android/app hay otro guild.gradle y hay que ver si está el plugin al principio de todo.

apply plugin: "com.android.application"
apply plugin: "com.facebook.react"
apply plugin: "com.google.gms.google-services". Este es el importante.

Después de hacer todo esto y volver a ejecutar npx expo run: android. HA FUNCIONADO.
Como se que funciona, porque ya no salta el error y en la consola está el token que generamos para el mensaje.
Accedemos a Messaging, en Firebase. Se crea una Campaña. Mensaje Firebase Notifications y seguimos las instrucciones.
