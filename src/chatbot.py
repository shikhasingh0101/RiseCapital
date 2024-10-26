from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chatbot():
    user_input = request.json.get('message', '').lower()
    
    if "hello" in user_input or "hi" in user_input or "hii" in user_input:
        response = "Hello! How can I assist you?"
    elif "suggest me some stocks for long term investing" in user_input:
        response = "You should buy HUL, ITC, BKT shares."
    elif "suggest me some stocks for intraday trading" in user_input:
        response = "You should buy BEL, Airtel, Bajaj Finserv shares."
    elif "bye" in user_input or "end" in user_input or "goodbye" in user_input:
        response = "Goodbye! Have a nice day."
    else:
        response = "I'm not sure I understand. Can you rephrase that?"

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
