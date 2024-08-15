# Admira Dashboard

## Descripción

Este proyecto es un dashboard analítico interactivo desarrollado con React y Styled Components. El dashboard integra datos de Google Analytics, Google Ads, Meta Ads y un sistema CRM, proporcionando visualizaciones clave para el análisis de datos.

## Requisitos Previos

- Node.js (versión 14 o superior)
- NPM o Yarn

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Jonathanr26/dashboard-analytics.git
   cd dashboard-analytics

2. Instala las dependencias:

    ```bash
    npm install
    # o si usas Yarn
    yarn install

## Uso

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
    # o si usas Yarn
    yarn dev

2. Abre tu navegador y visita http://localhost:3000 para ver el dashboard en acción.

## Despliegue

El proyecto puede ser desplegado fácilmente en plataformas como Vercel o Netlify. A continuación se presentan las instrucciones para desplegar en Vercel:

### Configura tu proyecto en Vercel:

1. Crea una nueva cuenta en [Vercel](https://vercel.com/) si no tienes una.
2. Crea un nuevo proyecto y selecciona el repositorio de GitHub.

### Configura los ajustes de despliegue:

- En la configuración del proyecto, asegúrate de que el comando de construcción sea `npm run build` y el directorio de salida sea `.next`.

### Despliega el proyecto:

1. Haz clic en "Deploy" y espera a que se complete el despliegue.
2. Una vez desplegado, verás un enlace a tu dashboard en vivo.

## Capturas de Pantalla

![ Dashboard home ](/public/dashboard_home.png)
![ Gráficos de líneas vistas diarias de página ](/public/google-analytics-vistaPagina.png)
![ Gráficos de líneas sesiones, aplicando filtro ](/public/google-analytics-sesiones.png)
![ Gráficos de pastel distribuciones demográficas, aplicando filtro ](/public/google-analytics-demografia.png)
![ Gráficos de barras para el rendimiento de campañas ](/public/google-ads-all.png)
![ Gráficos de barras para el rendimiento de una campaña, aplicando filtro ](/public/google-ads-campaña1.png)
![ Gráfico combinado de barras y líneas para mostrar gasto publicitario o conversiones versus participación o alcance. ](/public/meta-ads-conversiones-participacion.png)
![ Gráfico combinado de barras y líneas, aplicando filtro ](/public/meta-ads-gastosPublicidad-alcance.png)
![ Grafico de barras horizontales para CRM ](/public/crm-leads.png)
![ Modal para visualizar la info ](/public/modal-detail-view.png)

## Características Clave

- **Visualización de Datos:** Gráficos interactivos de Google Analytics, Google Ads, Meta Ads, y CRM.
- **Filtros Dinámicos:** Filtros avanzados para una exploración detallada de los datos.
- **Diseño Responsivo:** Funciona bien en dispositivos móviles y de escritorio.
- **Manejo de Errores:** Uso de `ErrorBoundary` para capturar y manejar errores inesperados.
- **Carga Diferida:** Carga bajo demanda para mejorar el rendimiento.






