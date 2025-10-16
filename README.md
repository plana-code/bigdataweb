# BigDataWeb - Telegram Web App

Лендинг для БигДата с интеграцией Telegram Mini App

## Описание

Современный лендинг-страница для компании БигДата, реализованная как Telegram Web App (Mini App). Проект включает адаптивный дизайн, интеграцию с Telegram Bot API и соответствует фирменному стилю компании.

## Технологический стек

- **Frontend:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript
- **Integration:** Telegram Web App SDK
- **Design System:** Собственная дизайн-система на основе Figma

## Структура проекта

```
bigdataweb/
├── index.html              # Главная страница
├── src/
│   ├── css/
│   │   ├── reset.css       # CSS Reset
│   │   ├── variables.css   # CSS Variables (Design Tokens)
│   │   ├── typography.css  # Типографика
│   │   ├── components.css  # Компоненты (кнопки, карточки и т.д.)
│   │   └── main.css        # Основные стили
│   ├── js/
│   │   ├── telegram.js     # Интеграция с Telegram Web App
│   │   └── main.js         # Основная логика приложения
│   └── assets/
│       ├── images/         # Изображения
│       └── icons/          # Иконки
├── package.json
├── .gitignore
└── README.md
```

## Дизайн-система

### Цветовая палитра

- **Primary:** `#FF9B7F` (коралловый)
- **Primary Light:** `#FFB89E`
- **Black:** `#000000`
- **Gray Dark:** `#4A4A4A`
- **Gray:** `#9E9E9E`
- **Gray Light:** `#E0E0E0`
- **White:** `#FFFFFF`

### Типографика

- **Шрифт:** System fonts (San Francisco, Segoe UI, Roboto)
- **Размеры заголовков:** 72px, 64px, 56px, 40px, 32px
- **Размеры текста:** 24px, 18px, 16px, 14px, 12px

## Разработка

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/plana-code/bigdataweb.git
cd bigdataweb
```

2. Откройте `index.html` в браузере или используйте live server

### Тестирование в Telegram

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Настройте Web App URL через BotFather
3. Разместите файлы на HTTPS-сервере
4. Откройте Web App через бота

## Функциональность Telegram Web App

- ✅ Автоматическое расширение на полный экран
- ✅ Интеграция с темой Telegram
- ✅ Haptic Feedback (вибрация)
- ✅ Кнопки Main Button и Back Button
- ✅ Отправка данных боту
- ✅ Popup-уведомления
- ✅ Получение данных пользователя

## API Functions

### TelegramWebApp

```javascript
// Отправить данные боту
TelegramWebApp.sendDataToBot(data);

// Показать alert
TelegramWebApp.showAlert(message);

// Показать confirm
TelegramWebApp.showConfirm(message, callback);

// Показать popup
TelegramWebApp.showPopup(params, callback);

// Haptic feedback
TelegramWebApp.hapticFeedback('medium');

// Открыть ссылку
TelegramWebApp.openLink(url);
```

## Деплой

### GitHub Pages

```bash
git push origin main
```

Настройте GitHub Pages в настройках репозитория.

### Собственный сервер

1. Загрузите файлы на сервер с HTTPS
2. Убедитесь, что сервер отдаёт правильные MIME-типы
3. Настройте CORS если требуется

## Roadmap

- [ ] Добавить секцию "Кейсы"
- [ ] Реализовать форму обратной связи
- [ ] Добавить анимации
- [ ] Интеграция с CRM
- [ ] Мультиязычность

## Лицензия

ISC

## Контакты

GitHub: [@plana-code](https://github.com/plana-code)