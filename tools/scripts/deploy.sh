#!/bin/bash

# Deploy Script for Xquads AIOS Squads Project
# This script handles deployment to different environments

set -e

# Configuration
ENVIRONMENT=${1:-development}
BUILD_DIR="dist"
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "=== Xquads AIOS Squads Deploy ==="
echo "Environment: $ENVIRONMENT"
echo "Timestamp: $TIMESTAMP"
echo

# Validate environment
case $ENVIRONMENT in
    development|staging|production)
        echo "Deploying to $ENVIRONMENT environment"
        ;;
    *)
        echo "Error: Invalid environment. Use: development, staging, or production"
        exit 1
        ;;
esac

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup current deployment if exists
if [ -d "$BUILD_DIR" ]; then
    echo "Backing up current build..."
    cp -r $BUILD_DIR $BACKUP_DIR/backup_$TIMESTAMP
fi

# Clean previous build
echo "Cleaning previous build..."
rm -rf $BUILD_DIR

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Run tests
echo "Running tests..."
npm test

# Build project
echo "Building project..."
npm run build

# Environment-specific deployment
case $ENVIRONMENT in
    development)
        echo "Deploying to development..."
        # Add development deployment commands
        npm run start:dev
        ;;
    staging)
        echo "Deploying to staging..."
        # Add staging deployment commands
        npm run start:staging
        ;;
    production)
        echo "Deploying to production..."
        # Add production deployment commands
        npm run start:prod
        ;;
esac

# Health check
echo "Running health check..."
curl -f http://localhost:3000/health || {
    echo "Error: Health check failed"
    exit 1
}

echo
echo "=== Deploy Complete ==="
echo "Environment: $ENVIRONMENT"
echo "Timestamp: $TIMESTAMP"
echo "Backup: $BACKUP_DIR/backup_$TIMESTAMP"
