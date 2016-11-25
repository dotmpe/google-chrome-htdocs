N := google-chrome-htdocs

dist:
	cp -r chrome-extension $(N)
	zip -x *swp -r $(N).zip $(N)
	rm -rf $(N)

clean:
	rm $(N).zip

srctree:
	@tree -C \
		-a \
		-I "bower_components|.*.swp|.git"


