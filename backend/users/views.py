
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import markdown

GEMINI_API_KEY = "AIzaSyDH_o3v-XxhXJR_wfJ3DttjYOjw9JzXmn4"
genai.configure(api_key=GEMINI_API_KEY)

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            if not user_message:
                return JsonResponse({"error": "Message cannot be empty"}, status=400)

            # Use Gemini model
            model = genai.GenerativeModel("gemini-1.5-pro")
            response = model.generate_content(user_message)

            # Debug: Print response to server logs
            print("Raw API Response:", response)

            # Extract AI response text
            ai_response = response.text if hasattr(response, "text") else None

            if not ai_response:
                return JsonResponse({"error": "AI response was empty"}, status=500)

            # 🔹 Convert Markdown to HTML (Bold, Bullet Points, Headings)
            formatted_response = markdown.markdown(ai_response)

            return JsonResponse({"response": formatted_response})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print("Error:", str(e))  # Debugging
            return JsonResponse({"error": f"Internal Server Error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)