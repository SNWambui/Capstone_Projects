import urllib.request

from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.template import engines
from django.views.generic import TemplateView

def iter_response(response, chunk_size=65536):
    '''Function to deal with increasingly large file sizes for development
    since production builds are optimized. Function uses django's streaming
    response API
    '''
    try:
        while True:
            data = response.read(chunk_size)
            if not data:
                break
            yield data
    finally:
        response.close()

def catchall_dev(request, upstream='http://localhost:3000'):
    '''Function to get the templates from the react path for development
    settings instead of using URL temlate loader. Handles html, CSS and 
    JS
    '''
    upstream_url = upstream + request.path
    response = urllib.request.urlopen(upstream_url)
    content_type = response.getheader('Content-Type')

    if content_type == 'text/html; charset=UTF-8':
        response_text = response.read().decode()
        response.close()
        return HttpResponse(
            engines['django'].from_string(response_text).render(),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )
    else:
        return StreamingHttpResponse(
            iter_response(response),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )


# during production, the template is loaded from frontend/build/static
catchall_prod = TemplateView.as_view(template_name='index.html')

# run the dev static from react side if debug is true else from frontend i
# ie deebug is false and we are in production.
catchall = catchall_dev if settings.DEBUG else catchall_prod