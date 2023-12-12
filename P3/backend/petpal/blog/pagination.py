from rest_framework.pagination import PageNumberPagination

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 8  
    # page_size_query_param = 'page_size'  # Allow client to override, if needed
    # max_page_size = 100  # Maximum limit allowed when overridden by client
