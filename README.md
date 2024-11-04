# Habits Manager

Aplicación de seguimiento de hábitos construida con React y TypeScript. Permite a los usuarios gestionar sus hábitos diarios, visualizar su progreso en gráficos interactivos (mensuales y anuales), y registrar la completitud diaria.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura de Archivos](#estructura-de-archivos)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- **Agregar y eliminar hábitos:** Los usuarios pueden añadir nuevos hábitos y gestionar sus tareas diarias.
- **Registro diario de hábitos:** Cada hábito cuenta con un log que permite marcar la completitud de días específicos.
- **Gráficos de Progreso:** 
  - Gráfica **semanal** para ver el progreso de los últimos 7 días.
  - Gráficas **mensuales** o **anuales** con la opción de cambiar el intervalo, visualizadas con Chart.js.
- **Visualización interactiva de hábitos:** Cada hábito se presenta en una tarjeta responsive con un diseño intuitivo y accesible.

## Tecnologías Usadas

- **React** con **TypeScript** - Para el desarrollo de componentes y tipado de datos.
- **Tailwind CSS** - Para los estilos.
- **Chart.js** - Librería de gráficos para la visualización de datos.
- **Firebase** - Para autenticación de usuarios y almacenamiento de datos.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/habits-manager.git
    ```

2. Instala las dependencias:
   ```bash
    cd habits-manager
    npm install
    ```

3. Configura Firebase:
- Crea un proyecto en Firebase y habilita la autenticación por correo electrónico.
- Agrega tu configuración de Firebase en el archivo src/firebase.ts:
   ```bash
    // src/firebase.ts
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore';

    const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    export const auth = firebase.auth();
    export const db = firebase.firestore();
    ```

4. nicia la aplicación:
   ```bash
    npm run dev
    ```

5. Abre en tu navegador: http://localhost:5173.

## Uso

1. **Inicia sesión**: Crea una cuenta o inicia sesión con tu correo electrónico.
2. **Agrega tus hábitos** usando el formulario en el Dashboard.
3. **Marca la completitud** de un hábito diariamente.
4. **Visualiza el progreso** en la gráfica semanal y alterna entre la gráfica mensual o anual para ver el progreso general.

## Estructura de Archivos

La estructura principal del proyecto es la siguiente:

```
habits-manager/
├── src/
│   ├── components/
│   │   └── HabitChart.tsx      # Componente de gráfico de progreso
│   ├── hooks/
│   │   ├── useAuth.tsx         # Hook para autenticación de usuario
│   │   └── useHabits.tsx       # Hook para interacciones con Firebase
│   ├── pages/
│   │   └── Dashboard.tsx       # Página principal del Dashboard
│   ├── App.tsx                 # Componente principal de la aplicación
│   ├── index.tsx               # Punto de entrada de React
│   └── firebase.ts             # Configuración de Firebase
└── README.md
```
