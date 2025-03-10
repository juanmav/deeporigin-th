#!/bin/sh
# Check if the environment is production
if [ "$NODE_ENV" != "production" ]; then
  echo "Running tests..."
  npm test
  if [ $? -ne 0 ]; then
    echo "Tests failed, exiting."
    exit 1
  fi
else
  echo "Production environment detected, skipping tests."
fi

echo "Starting the application..."
npm start
