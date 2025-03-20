// Fake Data for Users and Courses
const users = [
  { _id: 'teacher1', name: 'Thầy A', email: 'teacherA@example.com', roles: 'teacher' },
  { _id: 'teacher2', name: 'Thầy B', email: 'teacherB@example.com', roles: 'teacher' },
  {
    _id: 'student1',
    name: 'Nguyễn Văn A',
    email: 'student1@example.com',
    roles: 'student',
    course: 'course1'
  },
  {
    _id: 'student2',
    name: 'Trần Thị B',
    email: 'student2@example.com',
    roles: 'student',
    course: 'course1'
  },
  {
    _id: 'student3',
    name: 'Phạm Văn C',
    email: 'student3@example.com',
    roles: 'student',
    course: 'course2'
  }
]

const courses = [
  { _id: 'course1', name: 'Lập trình Node.js', user: 'teacher1' },
  { _id: 'course2', name: 'Lập trình Java', user: 'teacher1' },
  { _id: 'course3', name: 'Lập trình Python', user: 'teacher2' }
]

// Function to find students by teacherId
const findStudentsByTeacher = (teacherId) => {
  // 1. Tìm tất cả khóa học của giáo viên
  const teacherCourses = courses.filter((course) => course.user === teacherId)
  if (teacherCourses.length === 0) {
    console.log(`📢 Giáo viên ${teacherId} không có khóa học nào.`)
    return
  }

  const courseIds = teacherCourses.map((course) => course._id)

  // 2. Tìm tất cả sinh viên có khóa học thuộc danh sách courseIds
  const students = users.filter(
    (user) => user.roles === 'student' && courseIds.includes(user.course)
  )

  console.log(`📢 Giáo viên: ${teacherId}`)
  console.log('📚 Khóa học:', teacherCourses)
  console.log('🎓 Danh sách sinh viên:', students)
}

// Chạy test với teacher1
findStudentsByTeacher('teacher1')

// Chạy test với teacher2
findStudentsByTeacher('teacher2')

// Chạy test với giáo viên không có khóa học
findStudentsByTeacher('teacher3')
