# ⏰ Temporizador de Trabajo

Una aplicación web moderna con estética retro para gestionar tu tiempo de trabajo de manera eficiente y organizada.

## 🚀 Características

- **Interfaz retro monocromática**: Diseño vintage con paleta de colores crema, verde terminal y ámbar
- **Efectos visuales retro**: Scanlines animados y tipografía monoespaciada
- **Configuración flexible**: Define horas, minutos y segundos personalizados
- **Nombre de sesión**: Asigna nombres descriptivos a tus sesiones de trabajo
- **Botones de acceso rápido**: Presets para tiempos comunes (25 min, 50 min, 1 hora, 2 horas)
- **Controles intuitivos**: Iniciar, pausar y reiniciar con un clic
- **Melodía polifónica vintage**: Sonido retro al completar el tiempo
- **Notificaciones completas**: Alerta visual, sonora y del navegador
- **Historial de sesiones**: Registro completo de todas tus sesiones en pantalla dedicada
- **Navegación entre pantallas**: Interfaz limpia separando temporizador e historial
- **Atajos de teclado**: Controla el temporizador sin usar el mouse
- **Almacenamiento local**: Los datos persisten entre sesiones

## 📱 Cómo usar

### Pantalla Principal - Temporizador
1. **Nombre de sesión**: Escribe un nombre descriptivo (opcional)
2. **Tiempo personalizado**: Usa los campos de horas, minutos y segundos
3. **Tiempos predefinidos**: Haz clic en los botones de acceso rápido
4. **Controles**: Iniciar, pausar y reiniciar el temporizador
5. **Navegación**: Usa "📋 Ver Historial" para acceder al historial

### Pantalla de Historial
- **Visualización completa**: Todas las sesiones en pantalla dedicada
- **Datos detallados**: Fecha, nombre, duración planeada vs real, estado final
- **Estados de sesión**: Completado, Cancelado, Interrumpido
- **Limpieza**: Botón para eliminar todo el historial
- **Navegación**: Usa "← Volver" para regresar al temporizador

### Controles del temporizador
- **Iniciar**: Comienza la cuenta regresiva y registra el inicio
- **Pausar**: Detiene temporalmente el temporizador
- **Reiniciar**: Vuelve al tiempo original y registra la sesión como cancelada/interrumpida

### Atajos de teclado
- **Espacio**: Iniciar/Pausar el temporizador
- **Ctrl + R**: Reiniciar el temporizador

## 🎯 Casos de uso

### Técnica Pomodoro
- Configura 25 minutos para sesiones de trabajo intenso
- Usa el botón "25 min" para acceso rápido
- Nombra tus sesiones: "Pomodoro 1", "Pomodoro 2", etc.
- Revisa tu historial para ver tu productividad

### Reuniones y presentaciones
- Configura el tiempo exacto de tu reunión
- Nombra la sesión: "Reunión proyecto X"
- Recibe notificación cuando se acerque el final
- Analiza cuánto tiempo realmente duraron las reuniones

### Ejercicios y entrenamientos
- Configura intervalos de entrenamiento
- Usa presets para sesiones comunes
- Nombra tus rutinas: "Cardio", "Pesas", "Yoga"
- Mantén el ritmo sin distracciones

### Estudio y aprendizaje
- Configura sesiones de estudio
- Nombra por materia: "Matemáticas", "Historia", "Programación"
- Revisa tu historial para optimizar tiempos de estudio

## 🔧 Instalación y uso

### Opción 1: Uso directo
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Listo para usar!

### Opción 2: Servidor local
1. Abre una terminal en la carpeta del proyecto
2. Ejecuta un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (si tienes http-server instalado)
   npx http-server
   ```
3. Abre `http://localhost:8000` en tu navegador

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Permisos de notificación (opcional, para alertas del navegador)
- Almacenamiento local disponible (para el historial)

## 🎨 Características del diseño

### Estética retro
- **Paleta monocromática**: Colores crema, verde terminal, ámbar y marrón
- **Tipografía monoespaciada**: Courier New para autenticidad retro
- **Scanlines animados**: Efecto visual de pantalla CRT
- **Bordes gruesos**: Estilo pixel/offset vintage
- **Hover effects**: Animaciones suaves y retro

### Elementos visuales
- **Botones con elevación**: Efecto de profundidad al hacer hover
- **Campos de entrada**: Estilo consistente con bordes redondeados
- **Scrollbar personalizado**: Diseño retro para el historial
- **Badges de estado**: Colores diferenciados para cada estado de sesión
- **Navegación intuitiva**: Transiciones suaves entre pantallas

## 📊 Historial de sesiones

### Datos registrados
- **Fecha y hora de inicio**: Formato DD/MM/YYYY HH:MM
- **Nombre de la sesión**: Personalizable o "Sesión sin nombre"
- **Duración planeada**: Tiempo configurado originalmente
- **Duración real**: Tiempo efectivamente transcurrido
- **Estado final**: Completado, Cancelado o Interrumpido

### Gestión del historial
- **Almacenamiento local**: Persiste entre sesiones del navegador
- **Límite automático**: Máximo 50 sesiones (las más recientes)
- **Cálculo preciso**: Resta automáticamente el tiempo pausado
- **Limpieza completa**: Opción para eliminar todo el historial
- **Pantalla dedicada**: Interfaz optimizada para revisar el historial

## 🔊 Sistema de audio

### Melodía polifónica vintage
- **Web Audio API**: Generación de sonido en tiempo real
- **Múltiples voces**: Bajo, lead y pads para riqueza sonora
- **Escala menor**: Tonalidad C menor para ambiente retro
- **Vibrato suave**: Efecto de modulación vintage
- **Fallback**: Beep simple si Web Audio no está disponible

## 🔒 Privacidad y datos

- **Almacenamiento local**: No se envían datos a servidores externos
- **Datos personales**: Solo se guarda información de sesiones
- **Control total**: Puedes limpiar el historial en cualquier momento
- **Sin tracking**: No hay análisis de comportamiento

## 🐛 Solución de problemas

### El temporizador no inicia
- Verifica que hayas configurado un tiempo mayor a 0
- Asegúrate de que JavaScript esté habilitado
- Recarga la página si es necesario

### No se escuchan las notificaciones
- Verifica que el volumen del navegador esté activado
- Algunos navegadores requieren interacción del usuario para reproducir audio
- Las notificaciones del navegador requieren permisos explícitos

### El historial no se guarda
- Verifica que el almacenamiento local esté habilitado
- Algunos navegadores en modo incógnito pueden bloquear localStorage
- El historial se guarda automáticamente después de cada sesión

### Problemas en móviles
- La aplicación es completamente responsiva
- Los atajos de teclado no funcionan en dispositivos táctiles
- Las notificaciones del navegador pueden variar según el dispositivo

## 📈 Mejoras futuras

- [ ] Exportar historial a CSV/PDF
- [ ] Estadísticas de productividad
- [ ] Múltiples temporizadores simultáneos
- [ ] Modo oscuro alternativo
- [ ] Integración con calendarios
- [ ] Sincronización en la nube
- [ ] Categorías de sesiones
- [ ] Metas y objetivos
- [ ] Recordatorios programados
- [ ] Modo de enfoque (bloqueo de distracciones)
- [ ] Filtros y búsqueda en el historial
- [ ] Gráficos de productividad

## 🎨 Personalización

### Cambiar colores
Edita el archivo `styles.css` para personalizar:
- Variables CSS en `:root` para la paleta de colores
- Gradientes y efectos visuales
- Estilos de botones y animaciones

### Agregar nuevos presets
En `index.html`, agrega nuevos botones de preset:
```html
<button class="preset-btn" data-time="1800">30 min</button>
```

### Modificar notificaciones
En `script.js`, personaliza:
- Mensajes de notificación
- Melodía polifónica
- Comportamiento de las notificaciones

### Ajustar scanlines
En `styles.css`, modifica:
- Opacidad y color de las líneas
- Velocidad de animación
- Espaciado entre líneas

## 🤝 Contribuir

Si quieres mejorar el temporizador:
1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un pull request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta gestionando tu tiempo con estilo retro!** ⏰✨
