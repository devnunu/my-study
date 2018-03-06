
import pytube
import os
import subprocess

# 다운받을 동영상 URL 지정
yt = pytube.YouTube("https://www.youtube.com/watch?v=CTRO5NXmAp8")
videos = yt.streams.all()

# 화질별로 리스트가 나옴
# print('videos',videos)

# range(1,6) 1,2,3,4,5
# range(6) 0,1,2,3,4,5
# videos를 줄바꿈해서 출력 함
for i in range(len(videos)) :
    print(i,',',videos[i])

# 화질을 입력 받음
cNum = int(input("다운 받을 화질은?(0~21입력)"))

# 다운로드 경로
down_dir = "/Users/eunwoo/Desktop/"

# 다운로드 시작
videos[cNum].download(down_dir)

newFileName = input("변환 할 mp3 파일명은?")
oriFileName = videos[cNum].default_filename

subprocess.call(['ffmpeg','-i',
    os.path.join(down_dir,oriFileName),
    os.path.join(down_dir,newFileName)
])

print("동영상 다운로드 및 mp3 변환 완료!")