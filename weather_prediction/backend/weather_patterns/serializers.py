from rest_framework import serializers
from .models import City


class SnippetSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=25)
    id = serializers.IntegerField(read_only=True)
   
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return City.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `City` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance