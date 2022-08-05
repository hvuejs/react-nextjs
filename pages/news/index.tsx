import type { NextPage } from "next";
import Link from "next/link";

const News: NextPage = () => {
    const id = 119;
    return (
        <div className="news-page">
            <h1>新闻页</h1>
            <div>
                <Link href={{ pathname: "/news/" + id }} >
                    <a>查看详情</a>
                </Link>
            </div>
        </div>
    )
}

export default News;
