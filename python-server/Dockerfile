FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the requirements.txt file
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the application files
COPY . .

# Expose the desired port (if necessary)
EXPOSE 8150

# Update the command to start the application
CMD [ "python", "main.py" ]
# Commande pour exécuter l'application
# CMD [ "flask", "run","--host","0.0.0.0","--port","8150"]