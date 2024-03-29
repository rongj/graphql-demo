window.onload = function() {

    $('#btn2').click(function() {
        $.ajax({
            url: '/student',
            data: {},
            success: function(res) {
                if (res.success) {
                    renderStudent(res.data)
                }
            }
        })
    })

    $('#btn1').click(function() {
        $.ajax({
            url: '/course',
            data: {},
            success: function(res) {
                if (res.success) {
                    renderCourse(res.data)
                }
            }
        })
    })

    function renderStudent(data) {
        var str = ''
        data.forEach(function(item) {
            str += '<li>姓名：' + item.name + '，性别：' + item.sex + '，年龄：' + item.age + '</li>'
        })
        $('#studentList').html(str)
    }

    function renderCourse(data) {
        var str = ''
        data.forEach(function(item) {
            str += '<li>课程：' + item.title + '，简介：' + item.desc + '</li>'
        })
        $('#courseList').html(str)
    }

    // 请求看query参数就可以了，跟查询界面的参数差不多

    $('#btn3').click(function() {
        $.ajax({
            url: '/graphql',
            data: {
                query: `query{
          infos {
              _id
              weight
              height
              hobby
            }
            info(id: "5b35a3fad430d31ea9878864"){
              _id
              hobby
            }
            student {
              _id
              name
              age
              sex
            }

        }`
            },
            success: function(res) {
                renderStudent(res.data.student)
                renderCourse(res.data.course)
            }
        })
    })
}