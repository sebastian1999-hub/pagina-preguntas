# PWA - Gestor de Torneos

Aplicación web progresiva (PWA) para gestionar torneos eliminatorios y sistema suizo.

## 🚀 Características

✅ **Funciona Offline** - Usa la app sin conexión a internet
✅ **Instalable** - Instala en tu dispositivo como app nativa
✅ **Rápida** - Caché inteligente para carga instantánea
✅ **Responsive** - Se adapta a cualquier dispositivo
✅ **Torneos Eliminatorios** - Brackets automáticos
✅ **Sistema Suizo** - Emparejamientos inteligentes

## 📱 Instalación

### Opción 1: Desde el navegador móvil

1. Abre `tournament-pwa.html` en Chrome o Safari
2. Haz clic en el botón **"Instalar App"** 
3. O en el menú: "Agregar a pantalla de inicio"

### Opción 2: Desde el navegador de escritorio

1. Abre `tournament-pwa.html` en Chrome/Edge
2. Haz clic en el ícono de instalación en la barra de direcciones
3. O presiona el botón **"Instalar App"**

## 🛠️ Archivos del Proyecto

```
tournament-pwa.html           # Página principal de la PWA
tournament-manifest.json      # Configuración de la PWA
tournament-sw.js              # Service Worker (caché offline)
tournament.js                 # Lógica del gestor de torneos
tournament.css               # Estilos específicos
styles.css                   # Estilos generales
icon-192.png                 # Icono 192x192
icon-512.png                 # Icono 512x512
generate-icons.html          # Generador de iconos
```

## 📋 Uso

1. **Generar Iconos**: Abre `generate-icons.html` para crear icon-192.png y icon-512.png

2. **Servir con HTTPS**: Las PWA requieren HTTPS. Opciones:
   ```bash
   # Opción A: Servidor local con certificado
   npx http-server -S -C cert.pem -K key.pem
   
   # Opción B: Usar ngrok
   npx http-server
   ngrok http 8080
   
   # Opción C: GitHub Pages (recomendado)
   git push origin main
   # Activar GitHub Pages en configuración del repo
   ```

3. **Probar la PWA**:
   - Abre Chrome DevTools > Application > Service Workers
   - Verifica que el SW esté activo
   - Prueba modo offline en DevTools

## 🌐 Publicar en Internet

### GitHub Pages (GRATIS)

```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "PWA Torneos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/torneos-pwa.git
git push -u origin main

# 2. Activar GitHub Pages
# Settings > Pages > Source: main branch
# Tu app estará en: https://TU-USUARIO.github.io/torneos-pwa/tournament-pwa.html
```

### Netlify (GRATIS)

1. Arrastra la carpeta a https://app.netlify.com/drop
2. ¡Listo! Tu PWA está online

## 🔧 Configuración Adicional

### Cambiar colores de la app
Edita `tournament-manifest.json`:
```json
{
  "background_color": "#667eea",
  "theme_color": "#667eea"
}
```

### Modificar caché offline
Edita `tournament-sw.js` - array `urlsToCache`

## 📱 Características PWA

✅ Caché inteligente (Cache First)
✅ Indicador de conexión online/offline
✅ Botón de instalación integrado
✅ Funciona 100% offline después de la primera carga
✅ Optimizada para móviles
✅ Prevención de zoom accidental

## 🧪 Testing

1. **Lighthouse**: Chrome DevTools > Lighthouse > Progressive Web App
2. **Offline**: DevTools > Network > Offline
3. **Instalación**: DevTools > Application > Manifest

## ⚠️ Requisitos

- HTTPS (obligatorio para PWA)
- Navegador moderno (Chrome, Safari, Edge, Firefox)
- Service Workers habilitados

## 🎯 Próximos Pasos

- [ ] Agregar persistencia con IndexedDB
- [ ] Sincronización en la nube
- [ ] Notificaciones push
- [ ] Compartir torneos con QR
- [ ] Modo oscuro
- [ ] Múltiples idiomas

## 📄 Licencia

Código abierto - Uso libre
