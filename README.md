# ⏰ Temporizador de Trabajo

Una aplicación web moderna y fácil de usar para gestionar tu tiempo de trabajo de manera eficiente.

## 🚀 Características

- **Interfaz moderna y responsiva**: Diseño limpio que se adapta a cualquier dispositivo
- **Configuración flexible**: Define horas, minutos y segundos personalizados
- **Botones de acceso rápido**: Presets para tiempos comunes (25 min, 50 min, 1 hora, 2 horas)
- **Controles intuitivos**: Iniciar, pausar y reiniciar con un clic
- **Notificaciones**: Alerta visual y sonora cuando termina el tiempo
- **Atajos de teclado**: Controla el temporizador sin usar el mouse
- **Notificaciones del navegador**: Recibe alertas incluso si tienes otras ventanas abiertas

## 📱 Cómo usar

### Configuración del tiempo
1. **Tiempo personalizado**: Usa los campos de horas, minutos y segundos para configurar el tiempo exacto que necesitas
2. **Tiempos predefinidos**: Haz clic en los botones de acceso rápido (25 min, 50 min, 1 hora, 2 horas)

### Controles del temporizador
- **Iniciar**: Comienza la cuenta regresiva
- **Pausar**: Detiene temporalmente el temporizador
- **Reiniciar**: Vuelve al tiempo original configurado

### Atajos de teclado
- **Espacio**: Iniciar/Pausar el temporizador
- **Ctrl + R**: Reiniciar el temporizador

## 🎯 Casos de uso

### Técnica Pomodoro
- Configura 25 minutos para sesiones de trabajo intenso
- Usa el botón "25 min" para acceso rápido
- Toma descansos de 5 minutos entre sesiones

### Reuniones y presentaciones
- Configura el tiempo exacto de tu reunión
- Recibe notificación cuando se acerque el final
- Mantén el control del tiempo sin interrumpir

### Ejercicios y entrenamientos
- Configura intervalos de entrenamiento
- Usa presets para sesiones comunes
- Mantén el ritmo sin distracciones

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

## 🎨 Personalización

### Cambiar colores
Edita el archivo `styles.css` para personalizar:
- Colores del tema
- Gradientes de fondo
- Estilos de botones
- Animaciones

### Agregar nuevos presets
En `index.html`, agrega nuevos botones de preset:
```html
<button class="preset-btn" data-time="1800">30 min</button>
```

### Modificar notificaciones
En `script.js`, personaliza:
- Mensajes de notificación
- Sonidos de alerta
- Comportamiento de las notificaciones

## 🔒 Privacidad

- No se almacena información personal
- No se envían datos a servidores externos
- Funciona completamente en tu navegador
- Las notificaciones son locales

## 🐛 Solución de problemas

### El temporizador no inicia
- Verifica que hayas configurado un tiempo mayor a 0
- Asegúrate de que JavaScript esté habilitado
- Recarga la página si es necesario

### No se escuchan las notificaciones
- Verifica que el volumen del navegador esté activado
- Algunos navegadores requieren interacción del usuario para reproducir audio
- Las notificaciones del navegador requieren permisos explícitos

### Problemas en móviles
- La aplicación es completamente responsiva
- Los atajos de teclado no funcionan en dispositivos táctiles
- Las notificaciones del navegador pueden variar según el dispositivo

## 📈 Mejoras futuras

- [ ] Guardar configuraciones personalizadas
- [ ] Historial de sesiones
- [ ] Estadísticas de productividad
- [ ] Múltiples temporizadores
- [ ] Modo oscuro
- [ ] Integración con calendarios
- [ ] Exportar datos de sesiones

## 🤝 Contribuir

Si quieres mejorar el temporizador:
1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un pull request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta gestionando tu tiempo de manera eficiente!** ⏰✨
