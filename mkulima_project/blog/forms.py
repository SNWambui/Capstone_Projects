from .models import Comment
from django import forms

# class CommentForm(forms.Form):
#     author = forms.CharField(
#         max_length=60,
#         widget=forms.TextInput(attrs={
#             "class": "form-control",
#             "placeholder": "Your Name"
#         })
#     )
#     body = forms.CharField(widget=forms.Textarea(
#         attrs={
#             "class": "form-control",
#             "placeholder": "Leave a comment!"
#         })
#     )


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('name', 'email', 'body')