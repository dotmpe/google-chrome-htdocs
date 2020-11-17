.PHONY: def dist install pack clean-unpacked clean srctree help
def: dist

N := google-chrome-htdocs
P := \
			bootstrap/css/bootstrap.min.css \
			bootstrap/css/bootstrap-responsive.min.css \
			bluebird/js/browser/bluebird.js \
			jquery/dist/jquery.min.js \
			underscore/underscore-min.js \
			underscore.string/dist/underscore.string.min.js

install:
bower_components: bower.json
	bower install

dist:
	rsync -avzui --copy-links --delete extension/ $(N)
	for p in $(P) ; do \
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
		-I "components|.*.swp|.git"

help:
	@printf \
	'	install		download bower sources and make `dist`\n'\
	'	dist (default)	copy source to ``./google-chrome-htdocs``)\n'\
	'	pack		Zip ``./google-chrome-htdocs`` distribution package\n'\
	'	clean-packed	Remove zipped package\n'\
	'	clean		Remove zipped package and dist-directory\n'
