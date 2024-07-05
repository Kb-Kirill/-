---

# Прогноз Я

## О проекте

Данный проект - мобильное приложение, написанное на фреймворке React Native. Пользователь делает селфи, выбирает потенциальные вредные привычки, и приложение визуализирует, как он может выглядеть через 5, 10, 20 лет при употреблении наркотиков, алкоголя, курения. Для обработки фото используются две нейросетевые модели - SAM и ComfyUI-Image-Merge. Первая используется для "состаривания" лица, а вторая для наложения эффектов длительного употребления вредных веществ.

## Функциональные возможности

- Визуализация последствий вредных привычек на основе селфи пользователя.
- Возможность выбора различных вредных привычек и их комбинаций.
- Настройка параметров визуализации (время воздействия, интенсивность и т.д.).
- Сохранение и сравнение результатов.

## Развертывание приложения

Рекомендуемая IDE - VS Code

Требования - React Native, Node.js, Expo-cli

## Инструкция по установке

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/Kb-Kirill/Predict-me
    ```

2. Перейдите в папку проекта:
    ```bash
    cd Predict-me
    ```

3. Установите зависимости:
    ```bash
    npm install --legacy-peer-deps
    ```

4. Запустите приложение:
    ```bash
    npm start
    ```

## Структура файлов проекта

- **assets** - папка с ассетами проекта
- **node_modules** - папка с установленными библиотеками и модулями проекта
- **context** - содержит файл глобального контекста
- **components** - содержит файлы компонентов, используемые в страницах приложения
- **navigation** - содержит файлы, устанавливающие правила навигации
- **screens** - основная папка проекта, в которой лежат файлы со всеми страницами приложения
- **styles** - содержит файлы стилей проекта
- **App.js** - основной файл приложения (точка входа)
- **app.json** - описание характеристик проекта
- **babel.config.js**, **package-lock.json**, **package.json** - стандартные файлы, описывающие внутренние зависимости проекта

## Использование

После успешного развертывания приложения, откройте его на вашем мобильном устройстве с помощью Expo. Зарегистрируйтесь или войдите в существующую учетную запись. Далее, следуйте инструкциям на экране для создания и визуализации прогноза.

## Модель на REST API

Запросы к SAM и Image-Merge похожи, поэтому здесь будет разобрана работа с SAM.

Для "состаривания" фото требуется отправить POST запрос на сервис Replicate, который вернет обработанное фото:

```js
const response = await axios.post(
  "https://api.replicate.com/v1/predictions",
  {
    version:
      "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
    input: {
      image: `data:image/jpeg;base64,${base64User}`,
      target_age: ageInput,
    },
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
    },
  }
);
```

Запрос отправляется по адресу https://api.replicate.com/v1/predictions и содержит следующие данные: версия запускаемой модели, входные данные для модели (закодированная base64 фотография и целевой возраст), а также токен для авторизации.

## Модель на своем сервере

Также обе модели можно развернуть на своем сервере с помощью подготовленных докер-образов.

### SAM - установка образа

```bash
docker run -d -p 5000:5000 --gpus=all r8.im/yuval-alaluf/sam@sha256:9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c
```

### SAM - отправка POST запроса для обработки фото

```bash
curl -s -X POST \
-H "Content-Type: application/json" \
-d $'{
  "input": {
    "image": "https://replicate.delivery/mgxm/806bea64-bb51-4c8a-bf4d-15602eb60fdd/1287.jpg",
    "target_age": "default"
  }
}' \
http://localhost:5000/predictions
```

### Image-Merge - установка образа

```bash
docker run -d -p 5000:5000 --gpus=all r8.im/fofr/image-merger@sha256:db2c826b6a7215fd31695acb73b5b2c91a077f88a2a264c003745e62901e2867
```

### Image-Merge - отправка POST запроса для обработки фото

```bash
curl -s -X POST \
-H "Content-Type: application/json" \
-d $'{
  "input": {
    "steps": 20,
    "width": 768,
    "height": 768,
    "prompt": "an svg illustration, sharp, solid color, thick outline",
    "animate": false,
    "image_1": "https://replicate.delivery/pbxt/KLpMSbIo0rCeITgKcB6CPTsfUbSquTptlLHOR7SyDBiaUBUS/0_2.webp",
    "image_2": "https://replicate.delivery/pbxt/KLpMTQ754bUSZlPnrYog5JFI0mRGVoXAkQSlPk1yfHssW532/0_2-1.webp",
    "merge_mode": "left_right",
    "upscale_2x": true,
    "control_image": "https://replicate.delivery/pbxt/KLpMSa1lK4SMNxrhDnXFkk6BYkpIZVVXg3WrQIlLPCUn4Uaw/0_3.webp",
    "upscale_steps": 20,
    "animate_frames": 24,
    "negative_prompt": "garish, soft, ugly, broken, distorted",
    "image_1_strength": 1,
    "image_2_strength": 1,
    "return_temp_files": false
  }
}' \
http://localhost:5000/predictions
```

Подробнее можно изучить документацию на сервисе Replicate:
- SAM - https://replicate.com/yuval-alaluf/sam?input=docker
- Image-Merge - https://replicate.com/fofr/image-merger?input=docker

---
