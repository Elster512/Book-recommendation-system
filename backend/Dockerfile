FROM python:3.9

WORKDIR /back



COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . /back

EXPOSE 8008

 CMD python test.py