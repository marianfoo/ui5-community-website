sap.ui.define(
    ["sap/ui/core/XMLComposite"],
    function (XMLComposite) {
        const PackageListItemContent = XMLComposite.extend(
            "com.sap.ui5community.control.PackageListItemContent",
            {
                metadata: {
                    properties: {
                        name: { type: "string" },
                        description: { type: "string" },
                        link: { type: "string" },
                        type: { type: "string" },
                        tags: { type: "array" },
                        createdAt: { type: "Date" },
                        updatedAt: { type: "Date" },
                        rank: { type: "int" },
                        rankTooltip: { type: "string" },
                        rankIndicator: { type: "sap.m.DeviationIndicator" },
                        showRank : {type : "boolean", defaultValue : true},
                        rankColor: { type: "sap.m.ValueColor" }, // this is a computed property
                        typeImage: { type: "string" }, // this is a computed property
                    },
                },
            }
        );

        PackageListItemContent.prototype.setType = function (type) {
            this.setProperty("type", type, true);
            const image =
                type === "code-repository"
                    ? "resources/img/github.png"
                    : type === "docker-image"
                    ? "resources/img/docker.png"
                    : type === "npm-package"
                    ? "resources/img/npm.png"
                    : type === "pypi-package"
                    ? "resources/img/pypi.png"
                    : "";
            this.setProperty("typeImage", image);
        };

        PackageListItemContent.prototype.setRankIndicator = function (
            indicator
        ) {
            this.setProperty("rankIndicator", indicator, true);
            if (indicator === sap.m.DeviationIndicator.Up) {
                this.setProperty("rankColor", sap.m.ValueColor.Good);
                return;
            }
            if (indicator === sap.m.DeviationIndicator.Down) {
                this.setProperty("rankColor", sap.m.ValueColor.Error);
                return;
            }
            this.setProperty("rankColor", sap.m.ValueColor.Neutral);
        };

        return PackageListItemContent;
    },
    true
);