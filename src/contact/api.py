from .models import Info
from .serializers import InfoSerializer
from rest_framework import generics




#create Like API
class InfoCreateApi(generics.CreateAPIView):
    model = Info
    queryset = Info.objects.all()
    serializer_class = InfoSerializer

