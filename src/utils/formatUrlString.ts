export default function slugify(string: any) {
      const a = `àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;`
      const b = `aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------`
      const p = new RegExp(a.split('').join('| '), 'g')
      return string.toString().toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
            .replace(/đ/gi, 'd')
            .replace(/\s+/g, '-')
            .replace(p, (c: any) => b.charAt(a.indexOf(c)))
            .replace(/&/g, '-and -')
            // eslint-disable-next-line no-useless-escape
            .replace(/[^\w\-]+/g, '')
            // eslint-disable-next-line no-useless-escape
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
}
export const formatParam = (url: string) => {
      const params = url.split("?");
      return params
}
export const shareLink = () => {
      const string = window.location.search;
      if (string) {
            const queryString = string.split("?");
            const result =
                  queryString.length > 2
                        ? "?" +
                        queryString[1] +
                        "&" +
                        queryString[queryString.length - 1]
                        : "?" + queryString[1];
            const urlSearchParams = new URLSearchParams(result);
            return Object.fromEntries(urlSearchParams.entries());
      }
}