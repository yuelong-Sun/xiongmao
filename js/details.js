class Details {
    constructor() {
        this.getDetails()
    }


    async getDetails() {
        let url = location.href
        let index = url.indexOf('?')
        let subUrl = url.substring(index + 1)
        let id = subUrl.split('=')[1]
        let results = await axios.get({
            url: 'http://www.xiongmaoyouxuan.com/api/detail',
            data: {
                id
            }
        })
        if (results.code == 200) {
            console.log('111')
            let details = results.data.detail

            console.log(details)

            let detImg = details.descContentList

            console.log(detImg)
            let htmlimg = ''
            detImg.forEach(function(item,index){ 
                console.log(item.image.url)
                htmlimg +=
                `

                <img src="${item.image.url}" alt="" width="800" height="600">

                `
            })

            this._$('.productImg').innerHTML = htmlimg

            let htmlStr =
                `
        <div class="mainTop">
        <!-- 产品信息 -->
        <div class="productDetails">
            <div class="photo">
                <img src="${details.image}"
                    alt="">
            </div>
            <div class="textInfo">
                <div class="taobao">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwM0NGNDY1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwM0NGNDc1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzAzQ0Y0NDUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzAzQ0Y0NTUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PplzYJMAAAa9SURBVHja3FgHbFVlFP7O39dBF6tQNlqR5UC0KIK4ggiIjAipIxpEiANFcQWMQXFEiwHiiIjiDoZgJEZxMJKGFSVAmTJESlkttKxOSsc9fv+9j/d62wcUBUO8yX19/e9//3P+73znO+d/oqPkLwBNEfFS3oLzd511vWMBfrTknRT5+fl0pkHrRRt+VOHiuaoMLrLrf+KQkpyOXhCHAmc0ejKYGC7d7Gw7vYbbiIJGxUNKSrxnsXZrcgEdss7QrnPbGEiP25iMh6CLP4Ep2OGNXzcUMjYTzrbfIBuzoNtXwBzd5b1bE7z1NPGwFgNyjg4RGWfEJMjDb4USVa+/C/ry7ZBD+cCtGZC2l7u39n8I+spQYO8uaNv2QAuOt+wAbd4GaJwCiU0EqiuhxYeBPEpeTjYkb+tpHQtEQkej+LffKJ9qSPuuwCXpcLAWkn5nePrBHEi33tDhTwNpV0Mat4ioOKf+d8qKgOXfQudNgSni5mLkLA7xuRByPbAT6HRt2LBTzbFtkCETIQlNwtNTL4Xc+1JIhzU/B/rnGsjObKBwD1BOnsUmAFfdBAwcB5PQGBg0FtqlF5zXBsMU5/mQCkRU0wCX/moynJg4mCtvduGWb6ZCY+OBu5/wzxZvMYdOYN7bMFsXAmWVEA1yRoKeWlR2rYc+MwfCpDBpPaAZU4EPx/m8iMwhhswc2Q19Yzg0tSN3WQCUnoDJXAmJS/DQqKyA7t4EIYoSFYCkXQM0SWEC0JmECDGzNFj1BXTkC5AO3b2xa5gwiXHU54pQlpqIHHK44xcWAKMYivw9kPITcJ6dC7mirzfleCGcF28Fdq6jM1EeQrmbodtWQtt1JKEvgzarczdPc7NPjuSHTSWnQJM68OUzIVTJicOYYX1HuLfTigvNHguzfgnUkrdle0jmfS7sQi6cgsK07czx5UwIb0lhuGFq7bfqJMN1A4QZF1KB+CRoE2ZjwZ+ncciiwxHtekMIOjPwETjJzSFvj4BuWgS06gpn/3oaX010oqHMGiE66HI90CgxLBP7mAClRUGnOFpNLakq59daTvK7JDY7A0IkqJCNZuYI1GxlrDMmwSQ1g+kzHM7k78mh4dSSfIaPItmusxs6ffMeYMcKosisbN0pvNYH46HZWXTStzwtxvgjwk2cuZaRXDZDoha8A3nxZjjZS73FbhwG7THEKxOrvoPzVzacr6dA9q4E2nTjC3X21jQVSOXuW17i3S3aR66c0bE+VY+cZZbxdFwO/AFMHwVn+joYcknbdQE2LoSMfh0gQvJIJvDYTM+BQKx/jee+pKEaDxZrsLIcOrE3OVRR31aDiqu94ohW0XGSbh+5Q3IXH/Hq1KG9EEc8YzGxXrFtnUanaoXjaB7kRCnL0Amo5ZFbHyvr64HqOThUoXA69YJ0Tudmq4HcDdCUdtCfPuam1UXA7F7lOoQZmzynT9l5nwK6/Rdov3HQ9EGQXz+FyaNy10WyuqqBDtXQpG05xrzjiqHmbgF2b4A88RFk8KOe0bLj0Ak92Ybsqa/3NKRxFMrH30MUJcCxBfa3n4iPHxE9WQ6RszVojtd+6Pi5MFff4r34+49UbE/MwkarIWV5EXsNZZo7MQkMeaE3cO0AdgOpbuX3XWXFviiaSM4oeec8/B7M7fd7Q+V8aRmV2uLJ3ihklIVS+4yGk9CmjjcUlozJkHfZatjssoaSeNLq+4DLqdA0iiVKDvu8MPWQsUo9Zjpk2FNhJJbNh9nHjKP4YvOy8HiAMZ0wG2YGKzu55RO8XuQNw+Es+TLsQL+R0MYpfnRstTf1OKQh1J0nP4cMGB1WXC6qP8/y0KF9WTMfNUuHwPR/0J3jzqPmnCrqbomgSiNrHomcSTWPQU2nnjBrF0NyWO2fnBWO0F6qeVGe1x77HfKW00AjN3uEvQ+M90jX/AyTSwQaBZeJopLPYpe4+geWC9amGEoxM1BLKQkHSe79NLJvDbQDS0l3dpIF7BKn3Q+NbwIZQwcTksPWF83xZCQ6TCLhUZoroVlIEyx/rhrA7HrLbS108h3scajWsVL/AODUORyb4G0PJdNWw7C+WYQtapLY1HegxnekxdfPU8d8/eXRerXM1h6zZTH01bXQnkNhcrKCL9WZF3eaw7F11upSIcXU9tUszIhPdvsnlBxjD7WRyHwGWf2tV4bqrOBHKALB3ZfkHxxxbLZaHUpkjx3DTrOGAlhaSM7ke9U9LuJ26iBUOwAmjMI//V1BKpjS5YfDy0rwfCcNPgadx187rFE597NxA6dfmGPzv3BI/lOHoi+iHz+iLYcKLqIfrY79LcAAcY19lweKWggAAAAASUVORK5CYII="
                        alt="">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAvCAYAAABuWa03AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDY0QjJFNzU2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDY0QjJFNzY2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjRCMkU3MzZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjRCMkU3NDZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu3eOnMAAASVSURBVHja7FxNaNRAFJ6ui+Ax+C+IkoMevAi5iCJ4yKLgQVS2qNCT2D2IiIh2LehNzeJd2MWDp6IuInpQsQFFUQSNJxVFG6woepAGPahorb4hL3YIm2lmMrtJ2nzwsds0nUy+vHk/mZn2nR0+SiIwD7gRuB64HLiQFODhO/AD8C3wLvBbp5PKEccOAIeBk0Ab+B7oFppy0QdcCewHjgBbwNPALzzBVwGvAn8D9wEfFDpKYTXwJPAFsAq8H/yixJy0BAWmFr2pEDsR3gH3o6e4BqyEBS/hLy4D68CpQjMluAHcC7yEVv9f8AHgAhS7gFrcAV4AnmF9+HHkHwUX0NBv2RkItLQvBn53U+wPFXucxkhq4WuAy4C3FTU+CGwCx4BDKQtOxR5FVlPsx1fgLeAOauEbgA8VWjcrcjuHLkAXeDgNgXZpErK5jEXNZ0WdHULRCeahbk4Ft2KeW8UMxItx7ifqSUqYsE8qGr6BdXtzKAB7Mc/7RWNmWeGFm8x3F325KjgYhNOoHqNiVDCKhVBW6EqMkLUbCm+8PoPgVsT1tJBQJqd9J2ZfTMay22kIbgj4vG5mI2YM36xzgr1oQG0LuBNlguuYcrGW0lAkohlqOw7sDiPBigjiuoTbY7OXlsxNJRGcWsUVxjraCsWWhd2hDxbTPzv0QEUFH2RiiiPTwVICsUcZv0kvXuuikFlIL03GJbVkGykpENtDsT3FN6hJpF7dRJXpS88EpyI/DYldwWN/JcmLD1mBxgieyG2KCq4zlheI7ZDZj8FQrJKGaNBsoz+1InJXJ2aFaSnO03vlTpyk8UQmS3EIM4PRocyNUxGK+uS0fXgLq0sDP2u9FDwNOAJD3+SMKk+i2GGzkiZew0kjD+9FGiZTiOmcgJ/Uyk10L1ZalWbW0O1Ks4aia9hubTYJrgm6k15Umh62b+Hf1kWtXLXgRsz3H4bAOV7GDKHNPMSqqC8vd8EqTUUPLktlffg1gztDvOiZ4G6SsjciYGZxmi4Q3MiC4KKlL+34GGM5WuhG8jgRnemg6WJgNDoM0UZGLVyXjS9ZyVJaHQqRtOYx4xRXukQGlTnBZ8IYWjxvRZfOCdqGRKakYXWpRRRW7bwKHreCbKLodY71DXJKe1F4+HCHOhyvy7i7vAhuhm6213m3F4o5tmw/VAnuMsPZIGrfkWshq+X5dZFJ7LiT1I7K+1EluM2IMoo/O4rErjJ+0yX5nfDoCwSnm38WJWysQaYX/wQiqV6tSodwP2fYiz5km3ReWdUtLAZOUMGfAw8qcCkVMv0+WiPqZnSC9JC3OLSVAwtfB3xJBX9E/PXha4GvE1pgg6S/NkXFSLK74E52AgfoJDJdOXuR+NsEC0xPIVYUtrmH+Ps4Hwez9nQ/4Xbg1kJv5aDe4xzm8lOB4BPE3201QvI1m5510Fh2HXW9SQ+w61JoOncIP48A5xd6JcI24BPqRoAnovJw+iReAc8DDxN/3yYNIONEzS6J2Y6lxP//BLuIvy/zGGrKLXyeEX+j1RbgbuAp4AoitqxgLuIH8CPwDRos3UL/U6TSvIcsoBD/BBgAutkVlEak9oYAAAAASUVORK5CYII="
                        alt="">
                </div>
                <h1>
                    ${details.title}
                </h1>
                <div class="productPrice">
                    <p class="original-price">原价￥${details.originPrice}</p>
                    <div class="lastPrice">
                        <span>券后价：</span>
                        <span class="price">￥${details.price}</span>
                        <span>${details.couponValue}</span>
                        <span>${details.saleNum}人已购买</span>
                    </div>
                </div>
                <div class="expire-data">
                    优惠有效期：${details.expireDate}
                </div>
                <button class="goCart-btn"  date-index = "${details.id}">加入购物车</button>
            </div>
        </div>
        <!-- 店铺信息 -->
        <div class="shopInfo">
            <div class="shop-title">
                —————— 卖家信息 ——————
            </div>
            <img src="${details.shop.picUrl}" alt=""
                class="shopphoto">
            <p>${details.shop.nickname}</p>
            <div class="shop-score">
                <ul>
                    <li>描述</li>
                    <li>服务</li>
                    <li>物流</li>
                </ul>
                <br>
                <ul class="score">
                    <li>${details.shop.itemScore}</li>
                    <li>${details.shop.serviceScore}</li>
                    <li>${details.shop.deliveryScore}</li>
                </ul>
            </div>
        </div>
    </div>

        `
         this._$('#main').innerHTML = htmlStr
            

        }
    }
    //获取节点方法
    _$(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}
new Details