# Инструкция по деплою BigData Web App (Docker)

## Шаг 1: Настройка DNS (сделайте сейчас)

Зайдите в панель управления доменом `bigdatarf.ru` и добавьте A-запись:

```
Тип записи: A
Имя: app
Значение (IP): 88.99.245.52
TTL: 3600 (или Auto)
```

После добавления DNS может обновляться 5-15 минут.

---

## Шаг 2: Подключение к серверу

Откройте терминал (PowerShell, CMD или SSH клиент) и подключитесь:

```bash
ssh root@88.99.245.52
```

Пароль: `4z5ZSZmsuCEDXe`

---

## Шаг 3: Установка Docker и Docker Compose

Если Docker еще не установлен на сервере:

```bash
# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установить Docker Compose
apt-get update
apt-get install -y docker-compose-plugin

# Проверить установку
docker --version
docker compose version
```

---

## Шаг 4: Клонирование репозитория

```bash
# Перейти в директорию для веб-приложений
cd /var/www

# Клонировать репозиторий
git clone https://github.com/plana-code/bigdataweb.git

# Перейти в папку проекта
cd bigdataweb
```

---

## Шаг 5: Запуск контейнера

```bash
# Запустить Docker контейнер
docker compose up -d

# Проверить статус
docker compose ps
```

Docker автоматически:
- Развернет nginx:alpine контейнер
- Настроит gzip сжатие и кэширование
- Применит security headers
- Создаст volume для SSL сертификатов
- Настроит health checks

---

## Шаг 6: Установка SSL сертификата

```bash
# Войти в контейнер
docker compose exec web sh

# Установить SSL сертификат Let's Encrypt
certbot --nginx -d app.bigdatarf.ru --non-interactive --agree-tos --email your@email.com

# Выйти из контейнера
exit

# Перезапустить контейнер для применения изменений
docker compose restart
```

---

## Шаг 7: Проверка

После завершения откройте в браузере:

**https://app.bigdatarf.ru**

Вы должны увидеть ваш лендинг с рабочим SSL сертификатом!

---

## Обновление приложения

Когда нужно обновить код на сервере:

```bash
# Подключитесь к серверу
ssh root@88.99.245.52

# Перейдите в папку проекта
cd /var/www/bigdataweb

# Обновите код
git pull origin main

# Пересоберите и перезапустите контейнер
docker compose down
docker compose up -d --build

# Готово! Изменения применятся сразу
```

---

## Telegram Mini App

После успешного деплоя:

1. Откройте @BotFather в Telegram
2. Отправьте команду `/newapp`
3. Выберите бота (или создайте нового)
4. Укажите:
   - Название: `BigData`
   - Описание: `Автоматизация бизнес-процессов на базе локальных ИИ-моделей`
   - Фото: 640x360 пикселей
   - **Web App URL:** `https://app.bigdatarf.ru`

Готово! Ваше приложение появится в списке Mini Apps у пользователей.

---

## Полезные команды на сервере

```bash
# Проверить статус контейнера
docker compose ps

# Просмотреть логи контейнера
docker compose logs -f

# Просмотреть логи Nginx
docker compose exec web tail -f /var/log/nginx/access.log
docker compose exec web tail -f /var/log/nginx/error.log

# Войти в контейнер
docker compose exec web sh

# Перезапустить контейнер
docker compose restart

# Остановить контейнер
docker compose down

# Проверить SSL сертификат
docker compose exec web certbot certificates

# Обновить SSL сертификат вручную
docker compose exec web certbot renew

# Проверить конфигурацию Nginx
docker compose exec web nginx -t

# Пересобрать образ после изменений
docker compose up -d --build
```

---

## Troubleshooting

**Проблема:** DNS не обновился
- Решение: Подождите 15-30 минут, проверьте через `nslookup app.bigdatarf.ru`

**Проблема:** SSL сертификат не установился
- Решение: Убедитесь, что DNS настроен правильно, войдите в контейнер: `docker compose exec web sh` и повторите `certbot --nginx -d app.bigdatarf.ru`

**Проблема:** Сайт не открывается
- Решение: Проверьте `docker compose ps` и `docker compose logs`

**Проблема:** Контейнер не запускается
- Решение: Проверьте логи `docker compose logs` и убедитесь, что порты 80 и 443 свободны

**Проблема:** Изменения не применяются
- Решение: Пересоберите образ: `docker compose down && docker compose up -d --build`

---

## Контакты

Если возникли проблемы, проверьте логи или напишите агенту.