# Menu Translator

An application for translating and analyzing restaurant menus using computer vision and artificial intelligence technologies.

## Project Structure

The project consists of two main parts:

1. **Frontend (Angular)** - A client application that allows users to take a photo of a menu or upload an image, send it for processing, and receive a detailed analysis.

2. **Backend (Django)** - A server-side component that processes requests from the frontend, interacts with the OpenAI API, and returns analysis results.

```
/project-root/
    /menu-angular/         # Angular application
    /openai-backend/       # Django backend
```

## Running the Project

### Starting the Backend (Django)

1. Navigate to the openai-backend directory:
   ```bash
   cd openai-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file from the template and configure the API key:
   ```bash
   cp .env.example .env
   # Edit .env and add OPENAI_API_KEY
   ```

5. Apply migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Starting the Frontend (Angular)

1. Navigate to the Angular project directory:
   ```bash
   cd menu-angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open the application in a browser:
   ```
   http://localhost:4200
   ```

## Frontend and Backend Interaction

1. The frontend captures a menu image from the camera or gallery
2. The image is sent to the backend (`http://localhost:8000/api/process-image/`)
3. The backend processes the image using the OpenAI API
4. The backend returns the result in JSON format with information about the dishes
5. The frontend displays the results in a user-friendly way

## Security Notes

- The OpenAI API key is stored only on the backend
- CORS is configured to allow requests only from trusted sources (in development - localhost:4200)
- In production mode, it is recommended to configure HTTPS and additional security measures
