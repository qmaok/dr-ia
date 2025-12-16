/**
 * Cloudflare Worker - CORS Proxy for Innovamed API
 * This worker forwards requests to the Innovamed API and adds CORS headers
 */

export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight request
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        // Only allow POST requests
        if (request.method !== 'POST') {
            return new Response('Method not allowed', {
                status: 405,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        try {
            // Get the request body
            const body = await request.text();

            // Log the request for debugging
            console.log('Forwarding request to Innovamed API');
            console.log('Request body length:', body.length);

            // Forward the request to Innovamed API (Homologación environment)
            const apiResponse = await fetch('https://apirecipe.hml.qbitos.com/apirecipe/Receta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            // Get the response
            const responseData = await apiResponse.text();

            // Log response for debugging
            console.log('API Response Status:', apiResponse.status);
            console.log('API Response:', responseData.substring(0, 200));

            // Create response with CORS headers
            const response = new Response(responseData, {
                status: apiResponse.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });

            return response;
        } catch (error) {
            console.error('Worker error:', error);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Proxy error',
                    message: error.message,
                }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }
    },
};
