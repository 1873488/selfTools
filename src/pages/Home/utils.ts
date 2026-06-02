import { featureCollection, getCoords, feature } from "@turf/turf";
// 读取文件内容再返回
export const getFilesContent = (
  files: FileList | null,
): Promise<Promise<{ fileName: string; content: string }>[]> => {
  return new Promise((resolve, reject) => {
    let promises: Promise<{ fileName: string; content: string }>[] = [];
    if (files instanceof FileList) {
      const filelistLength = files.length;
      let index = 0;
      while (index < filelistLength) {
        const file = files.item(index);
        if (!file) continue;
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
          }),
        );
        index++;
      }
      resolve(promises);
    } else reject("没有文件被选中");
  });
};
// 整合多个geojson文件内容为一个featureCollection
export const integration = (
  contents: { fileName: string; content: string }[],
): ReturnType<typeof featureCollection> => {
  const geojson = featureCollection([]);
  let _features: ReturnType<typeof feature>[] = [];
  contents.forEach(({ fileName, content }) => {
    const thisContent = JSON.parse(content);
    console.log(fileName, JSON.parse(content));
    switch (thisContent.type) {
      case "FeatureCollection":
        thisContent.features.forEach((feature: any) => {
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
