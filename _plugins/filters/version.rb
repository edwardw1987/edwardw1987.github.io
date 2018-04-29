module Jekyll
  module AssetFilter
    def version(input)
      "#{input}?v=#{Time.now.strftime('%Y%m%d%H%M%S')}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)