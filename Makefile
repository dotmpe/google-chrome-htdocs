def: dist
	
N := google-chrome-htdocs
P := \
			bootstrap/css/bootstrap.min.css \
			bootstrap/css/bootstrap-responsive.min.css \
			bluebird/js/browser/bluebird.js \
			jquery/dist/jquery.min.js \
			underscore/underscore-min.js \
      underscore.string/dist/underscore.string.min.js

dist: extension/ components/
	rsync -avzui --copy-links --delete extension/ $(N)
	for p in $(P)\
	; do \
		mkdir -vp $(N)/components/$$(dirname $$p); \
		cp components/$$p $(N)/components/$$p; \
	done

pack:
	zip -x *swp -r $(N).zip $(N)

clean-unpacked:
	rm -rf $(N)

clean: clean-unpacked
	rm $(N).zip

srctree:
	@tree -C \
		-a \
		-I "bower_components|.*.swp|.git"


