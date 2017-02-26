BUILD           = ./build/
BUILD_PATH      = $(BUILD)kana-totsugeki/
BUILD_TMP_PATH  = $(BUILD)tmp/

SCSS_PATH       = ./scss/
SCSS_MAIN       = $(SCSS_PATH)kana_totsugeki.scss
SCSS_FILES      = $(shell find $(SCSS_PATH) -type f -name '*.scss')
 
CSS_TARGET_PATH = $(BUILD_PATH)css/
CSS_TARGET      = $(CSS_TARGET_PATH)kana_totsugeki.css
  
JS_PATH         = ./js/
JS_FILES        = $(shell find $(JS_PATH) -type f -name '*.js')
JS_TARGET_PATH  = $(BUILD_PATH)js/
JS_TARGET       = $(JS_TARGET_PATH)kana_totsugeki.js
JS_TMP_TARGET   = $(BUILD_TMP_PATH)tmp.js

ESCAPE_SED = sed -e 's/[]\/$*.^|[]/\\&/g'

IMAGES_PATH        = ./images/
IMAGES_FILES       = $(shell find $(IMAGES_PATH) -type f -name '*.png')
IMAGES_TARGET_PATH = $(BUILD_PATH)images/
IMAGES_TMP_TARGET  = $(shell echo $(IMAGES_PATH) | $(ESCAPE_SED))
IMAGES_TMP_TARGET_PATH = $(shell echo $(IMAGES_TARGET_PATH) | $(ESCAPE_SED))
IMAGES_TARGETS     = $(shell echo $(IMAGES_FILES) | sed 's/$(IMAGES_TMP_TARGET)/$(IMAGES_TMP_TARGET_PATH)/g')

HTML_FILE = index.html

BUILD_PATH_ESCAPED = $(shell echo $(BUILD_PATH) | $(ESCAPE_SED))
HTML_FILE_TARGET = $(shell echo $(HTML_FILE) | sed 's/^/$(BUILD_PATH_ESCAPED)/g')

DIRECTORIES     = $(BUILD_PATH) $(CSS_TARGET_PATH) $(JS_TARGET_PATH) $(IMAGES_TARGET_PATH)

all: | $(DIRECTORIES) css js html images

css: $(SCSS_FILES) | $(DIRECTORIES) $(CSS_TARGET) 

js: $(JS_FILES) | $(DIRECTORIES) $(JS_TARGET)

html: $(HTML_FILE) | $(DIRECTORIES) $(HTML_FILE_TARGET)

images: $(IMAGES_FILES) | $(DIRECTORIES) $(IMAGES_TARGETS)

$(IMAGES_TARGETS): $(IMAGES_FILES)
	@echo -e "Copying Images files...\t\t\t\c"
	@cp $(IMAGES_FILES) $(IMAGES_TARGET_PATH)
	@echo -e "[ Done ]"

$(HTML_FILE_TARGET): $(HTML_FILE)
	@echo -e "Copying HTML files...\t\t\t\c"
	@cp $(HTML_FILE) $(BUILD_PATH)
	@echo "[ Done ]"

$(CSS_TARGET): $(SCSS_FILES)
	@echo -e "Compiling SCSS...\t\t\t\c"
	@scss -C --sourcemap=none $(SCSS_MAIN) $(CSS_TARGET) -t compressed 
	@echo -e "[ Done ]"

$(JS_TARGET): $(JS_FILES)
	@echo -e "Concating JS files...\t\t\t\c"
	@mkdir -p $(BUILD_TMP_PATH)
	@rm -f $(JS_TMP_TARGET)
	@for JS in $(JS_FILES); do \
		cat $$JS >> $(JS_TMP_TARGET); \
	done
	@echo -e "[ Done ]\nCompressing JS...\t\t\t\c"
	@yuicompressor --type js --charset utf-8 --nomunge -o $(JS_TARGET) $(JS_TMP_TARGET) > /dev/null 2>&1
	@rm -rf $(BUILD_TMP_PATH)
	@echo "[ Done ]"

$(DIRECTORIES):
	@echo -e "Making directories...\t\t\t\c"
	@mkdir -p $(BUILD)
	@mkdir -p $(BUILD_PATH)
	@mkdir -p $(JS_TARGET_PATH)
	@mkdir -p $(CSS_TARGET_PATH)
	@mkdir -p $(IMAGES_TARGET_PATH)
	@echo "[ Done ]"

clean:
	@rm -rf $(CSS_TARGET_PATH) $(JS_TARGET_PATH) $(BUILD_PATH) $(BUILD)
