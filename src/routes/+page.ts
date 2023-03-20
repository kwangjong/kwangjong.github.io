// export async function load({ fetch }) {
//     let content: string = await fetch("https://raw.githubusercontent.com/kwangjong/Kwangjong/main/README.md")
//         .then(response => response.blob())
//         .then(blob => blob.text())
//         .then(markdown => {
//             return markdown;
//         });

//     return { content } ;
//   }