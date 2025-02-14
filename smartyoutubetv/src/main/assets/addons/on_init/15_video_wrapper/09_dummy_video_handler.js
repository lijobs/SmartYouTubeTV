function DummyVideoHandler() {
    this.TAG = 'DummyVideoHandler';
    this.addons = [new PlaybackEndAddon(), new VideoPositionAddon()];

    this.onCreate = function(video) {
        EventUtils.turnOffEvents(video);

        this.redirectProps(video);

        this.onInitAddons(video);
    };

    this.redirectProps = function(video) {
        var $this = this;

        EventUtils.turnOffProp(video, 'webkitDecodedFrameCount');
        EventUtils.turnOffProp(video, 'webkitAudioDecodedByteCount');
        EventUtils.turnOffProp(video, 'webkitVideoDecodedByteCount');
        EventUtils.turnOffProp(video, 'networkState');
        EventUtils.turnOffProp(video, 'readyState');
        EventUtils.turnOffProp(video, 'paused');
        EventUtils.turnOffProp(video, 'ended');

        // ??
        EventUtils.turnOffProp(video, 'videoWidth');
        EventUtils.turnOffProp(video, 'videoHeight');

        EventUtils.turnOffProp(video, 'baseURI');
        EventUtils.turnOffProp(video, 'currentSrc');

        EventUtils.turnOffProp(video, 'duration');
        
        EventUtils.turnOffProp(video, 'currentTime', true, function(val) {
            Log.d($this.TAG, "On set currentTime " + val);
            $this.onCurrentTimeAddons(video);
        });

        EventUtils.turnOffProp(video, 'src', true, function(val) {
            Log.d($this.TAG, "Video src changed: " + val);
            $this.onSrcChangeAddons(video);
        });
    };

    this.onInitAddons = function(video) {
        for (var i = 0; i < this.addons.length; i++) {
            var addon = this.addons[i];
            if (addon.onInit) {
                addon.onInit(video);
            }
        }
    };

    this.onCurrentTimeAddons = function(video) {
        for (var i = 0; i < this.addons.length; i++) {
            var addon = this.addons[i];
            if (addon.onCurrentTime) {
                addon.onCurrentTime(video);
            }
        }
    };

    this.onSrcChangeAddons = function(video) {
        for (var i = 0; i < this.addons.length; i++) {
            var addon = this.addons[i];
            if (addon.onSrcChange) {
                addon.onSrcChange(video);
            }
        }
    };

    /**
     * NOTE: you will loose original property!
     */
    this.onPropChange = function(obj, propName, callback) {
        Object.defineProperty(obj, propName, {
            set: function(val) {
                if (callback) {
                    callback(val);
                }
            }
        });
    };
}