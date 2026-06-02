import { featureCollection, getCoords, feature } from "@turf/turf";
type TurfFeature = ReturnType<typeof feature>;
// 读取文件内容再返回
export const getFilesContent = (
  files: FileList | null,
): Promise<{ fileName: string; content: string }[]> => {
  return new Promise((resolve, reject) => {
    if (!(files instanceof FileList)) {
      reject("没有文件被选中");
      return;
    }

    const promises: Promise<{ fileName: string; content: string }>[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files.item(index);
      if (!file) {
        continue;
      }

      promises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
            resolve({
              fileName: file.name,
              content: (e.target?.result as string) ?? "{}",
            });
          };
          reader.onerror = () => {
            resolve({
              fileName: file.name,
              content: "{}",
            });
          };
        }),
      );
    }

    Promise.all(promises).then(resolve).catch(reject);
  });
};
// 整合多个geojson文件内容为一个featureCollection
export const integration = (
  contents: { fileName: string; content: string }[],
): ReturnType<typeof featureCollection> => {
  const geojson = featureCollection([]);
  const _features: TurfFeature[] = [];
  contents.forEach(({ fileName, content }) => {
    const thisContent = JSON.parse(content);
    console.log(fileName, thisContent);
    switch (thisContent.type) {
      case "FeatureCollection":
        thisContent.features.forEach((feature: TurfFeature) => {
          feature.properties = {
            ...feature.properties,
            fileName,
          };
        });
        _features.push(...thisContent.features);
        break;
      case "Feature":
        thisContent.properties = {
          ...thisContent.properties,
          fileName,
        };
        _features.push(thisContent);
        break;
      default:
        _features.push(
          feature({
            type: thisContent.type,
            properties: {
              fileName,
            },
            coordinates: getCoords(thisContent),
          }),
        );
        break;
    }
  });
  geojson.features = _features;
  return geojson;
};
