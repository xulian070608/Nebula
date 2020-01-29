import django_filters


class ProjectFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr="iexact")

    class Meta:
        model = Product
        fields = ["price", "release_date"]
