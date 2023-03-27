package metrics

import (
	"context"

	"github.com/appkube/cloud-datasource/pkg/infra/log"
	//"github.com/appkube/cloud-datasource/pkg/setting"
)

var metricsLogger log.Logger = log.New("metrics")

type logWrapper struct {
	logger log.Logger
}

func (lw *logWrapper) Println(v ...interface{}) {
	lw.logger.Info("graphite metric bridge", v...)
}

//func init() {
//	initMetricVars()
//	initFrontendMetrics()
//}

//	func ProvideService(cfg *setting.Cfg) (*InternalMetricsService, error) {
//		s := &InternalMetricsService{
//			Cfg: cfg,
//		}
//		return s, s.readSettings()
//	}
func ProvideService() (*InternalMetricsService, error) {
	s := &InternalMetricsService{
		//Cfg: cfg,
	}
	return s, s.readSettings()
}

type InternalMetricsService struct {
	//Cfg *setting.Cfg

	intervalSeconds int64
	//graphiteCfg     *graphitebridge.Config
}

func (im *InternalMetricsService) Run(ctx context.Context) error {
	// Start Graphite Bridge
	//if im.graphiteCfg != nil {
	//	bridge, err := graphitebridge.NewBridge(im.graphiteCfg)
	//	if err != nil {
	//		metricsLogger.Error("failed to create graphite bridge", "error", err)
	//	} else {
	//		go bridge.Run(ctx)
	//	}
	//}

	//MInstanceStart.Inc()

	<-ctx.Done()
	return ctx.Err()
}
