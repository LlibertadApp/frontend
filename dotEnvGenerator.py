import sys
import json

# Description
#  This script was designed to be used as one of the steps in the CI/CD job.
#  It expect a JSON as an argument.
#  It will create a temporary .env file based on the contents of
#     both the .env.example and the JSON provided as an argument.
# Usage EXAMPLE:
#
#    steps:
#    - name: Build .env with Python
#      run: |
#        VARIABLES_JSON='{
#          "BUCKET_NAME": "${{ vars.BUCKET_NAME }}",
#          "FRONT_END_URL": "${{ vars.FRONT_END_URL }}",
#          "SECRET_TOKEN": "${{ secrets.SECRET_TOKEN }}"
#        }'
#        python3 dotEnvGenerator.py "$VARIABLES_JSON"

def main():
  # Obtain the JSON arg from the arguments:
  varsText = sys.argv[1]
  varsJson = json.loads(varsText)

  # Open .env.example file and get existing values
  with open('.env.example', 'r') as env_example_file:
    env_data = env_example_file.readlines()

  # Create a temp dictionary to store values
  temp_env_data = {}

  # Process each .env.example line
  for line in env_data:
    if line.strip() and not line.strip().startswith('#'):
      key, _ = line.strip().split('=', 1)

      # Attempt to retrieve the value from the JSON that was given as an arg.
      if key in varsJson:
        value = varsJson[key]
        temp_env_data[key] = value
      else:
        raise ValueError(f'Error: Variable {key} not found on the provided JSON.')

  # Write the new values to the .env file.
  with open('.env', 'w') as env_file:
    for key, value in temp_env_data.items():
      env_file.write(f'{key}="{value}"\n')

if __name__ == "__main__":
  main()

