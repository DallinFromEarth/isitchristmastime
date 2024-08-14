// the meat of this code that deals with headers and stuff was generated by ChatGPT.

export const processRequest = (
  request: Request<unknown, IncomingRequestCfProperties<unknown>>,
  requestHandler: (request: Request<unknown, IncomingRequestCfProperties<unknown>>) => Response
): Response => {
  // Get the Origin header from the incoming request
  const origin = request.headers.get('Origin')

  // Check if the origin is from the same domain
  if (origin && new URL(origin).hostname === new URL(request.url).hostname) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin, // Allow the specific origin that made the request
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', // Specify the allowed methods
      'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
      'Access-Control-Allow-Credentials': 'true' // Allow credentials (cookies, authorization headers)
    }

    // Handle preflight (OPTIONS) requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      })
    }

    // Return the actual response with CORS headers
    var response = requestHandler(request)
    return new Response(response.body, { ...response, headers: corsHeaders })
  }

  // If the request is not from the same domain, return a 403 Forbidden response
  return new Response(
    "Forbidden, you silly goose. You're requesting from: " +
      new URL(request.url).hostname +
      ' but we only accept ' +
      new URL(origin).hostname,
    { status: 403 }
  )
}
