#!/bin/bash
# PayPrompt MVP - Neon Database Setup Script
# This script creates a free Neon PostgreSQL database and configures Vercel

set -e

echo "============================================"
echo "  PayPrompt MVP - Database Setup"
echo "============================================"
echo ""
echo "This script will:"
echo "  1. Create a free Neon PostgreSQL database"
echo "  2. Update Vercel environment variables"
echo "  3. Run Prisma migrations"
echo ""
echo "Prerequisites:"
echo "  - Neon API key (get from https://console.neon.tech/app/settings/api-keys)"
echo "  - Vercel CLI installed (npm install -g vercel)"
echo "  - Vercel project linked (vercel link)"
echo ""

# Check for Neon API Key
if [ -z "$NEON_API_KEY" ]; then
    echo "❌ NEON_API_KEY environment variable not set"
    echo "   Get your API key at: https://console.neon.tech/app/settings/api-keys"
    echo "   Then run: export NEON_API_KEY=your-api-key"
    exit 1
fi

# Create Neon Project
echo "📦 Creating Neon PostgreSQL project..."
RESPONSE=$(curl -s -X POST 'https://console.neon.tech/api/v2/projects' \
    -H 'Accept: application/json' \
    -H "Authorization: Bearer ${NEON_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d '{
        "project": {
            "name": "payprompt-mvp",
            "region_id": "aws-ap-southeast-1",
            "pg_version": 17
        }
    }')

# Extract connection string
CONNECTION_URI=$(echo "${RESPONSE}" | python3 -c "
import sys,json
try:
    data = json.load(sys.stdin)
    uris = data.get('connection_uris', [])
    if uris:
        print(uris[0].get('connection_uri', ''))
    else:
        print('')
except:
    print('')
" 2>/dev/null)

if [ -z "$CONNECTION_URI" ]; then
    echo "❌ Failed to create Neon project"
    echo "Response: ${RESPONSE}"
    exit 1
fi

echo "✅ Neon project created!"
echo ""

# Create pooled URL for Vercel serverless
POOLED_URL="${CONNECTION_URI}&pgbouncer=true"

echo "🔧 Updating Vercel environment variables..."
echo ""

# Set environment variables on Vercel
echo "${CONNECTION_URI}" | vercel env add DATABASE_URL_UNPOOLED production preview development
echo "${POOLED_URL}" | vercel env add DATABASE_URL production preview development

echo "✅ Vercel environment variables updated!"
echo ""

# Run Prisma migration
echo "📊 Running Prisma migration..."
export DATABASE_URL="${CONNECTION_URI}"
export DATABASE_URL_UNPOOLED="${CONNECTION_URI}"
npx prisma db push --accept-data-loss

echo "✅ Database schema applied!"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "============================================"
echo "  ✅ Setup Complete!"
echo "============================================"
echo ""
echo "Your PayPrompt MVP is now live with:"
echo "  - Neon PostgreSQL database"
echo "  - User authentication (signup/login)"
echo "  - Route protection"
echo ""
echo "Test it: https://paypromptmvp.vercel.app/signup"
echo ""
