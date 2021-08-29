<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
    },
    render(h) {
        const splited = this.text.split("§r");
        const childs = [];

        function child (text) {
            const color = text.match(/§[0-9a-fk-or]/g);
                console.log(text);
            if (color) {
                const colorCode = color[0].replace("§", "");
                text = text.replace(color[0], "");
                return h("span", {
                    class: [
                        `c-${colorCode}`
                    ]
                }, [child(text)]);
            } else {
                return text;
            }
        }

        for (let i = 0; i < splited.length; i++) {
            childs.push(h("span", {} , [child(splited[i])]));
        }

        return h('span', {
            class: [
                'minecraft-text-format'
            ]
        }, childs);
    }
}
</script>
<style lang="scss" scoped>
.minecraft-text-format {
    color: #fff;

    .c-0 {
        color: #000;
    }

    .c-1 {
        color: #0000AA;
    }

    .c-2 {
        color: #00AA00;
    }

    .c-3 {
        color: #00AAAA;
    }

    .c-4 {
        color: #AA0000;
    }

    .c-5 {
        color: #AA00AA;
    }

    .c-6 {
        color: #FFAA00;
    }

    .c-7 {
        color: #AAAAAA;
    }

    .c-8 {
        color: #555555;
    }

    .c-9 {
        color: #5555FF;
    }

    .c-a {
        color: #55FF55;
    }

    .c-b {
        color: #55FFFF;
    }

    .c-c {
        color: #FF5555;
    }

    .c-d {
        color: #FF55FF;
    }

    .c-e {
        color: #FFFF55;
    }

    .c-f {
        color: #FFFFFF;
    }

    .c-g {
        color: #DDD605;
    }

    .c-l {
        font-weight: bold;
    }

    .c-m {
        text-decoration: line-through;
    }

    .c-n {
        text-decoration: underline;
    }

    .c-o {
        font-style: italic;
    }
}
</style>