### make orphan build branch ###

HAS_NPM := $(shell command -v npm > /dev/null && echo $$?)
ifeq (0, $(HAS_NPM))
    PM = npm
else
    $(error Npm is not installed)
endif

CONFIG_DIR := public/assets
TMP_CONFIG := $(CONFIG_DIR)/config.local

BUILD_CONFIG := $(CONFIG_DIR)/config.js
BUILD_BRANCH := build_production
BUILD_CONFIG_SOURCE := $(CONFIG_DIR)/config.js.production

CACHE_PARAM := $$(date +%s)

ifneq ($(shell test -e $(BUILD_CONFIG_SOURCE) && echo $$?), 0)
    $(error Config file $(BUILD_CONFIG_SOURCE) not exists)
endif

ifneq ($(shell test -e $(BUILD_CONFIG) && echo $$?), 0)
    $(shell touch $(BUILD_CONFIG))
endif


production: all

all: clean clean_remote rollout

clean:
	-git branch -D $(BUILD_BRANCH)

clean_remote:
	-git push origin :$(BUILD_BRANCH)

rollout:
	@ \
	CURRENT_BRANCH=$$(git status | grep "On branch" | cut -c 11-) && \
	git checkout --orphan $(BUILD_BRANCH) && \
	\
	sed -i.bak '/public\/build/d' .gitignore && \
	sed -i.bak '/public\/assets\/config.js/d' .gitignore && \
	rm .gitignore.bak && \
	\
	sed -i "s/CACHE_PARAM/$(CACHE_PARAM)/g" ./public/index.html && \
	\
	cp $(BUILD_CONFIG) $(TMP_CONFIG) && \
	cp $(BUILD_CONFIG_SOURCE) $(BUILD_CONFIG) && \
	\
	$(PM) install && \
	$(PM) run build && \
	\
	git add -A > /dev/null && \
	git commit -am "build" > /dev/null && \
	git push origin $(BUILD_BRANCH) && \
	git checkout "$$CURRENT_BRANCH" && \
	\
	mv $(TMP_CONFIG) $(BUILD_CONFIG)

.PHONY: all, rollout, clean, clean_remote, production
